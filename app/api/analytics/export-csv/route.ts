import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import * as XLSX from "xlsx";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const exportType = searchParams.get("type") || "overview";
        const dateFrom = searchParams.get("dateFrom");
        const dateTo = searchParams.get("dateTo");
        const status = searchParams.get("status");
        const period = searchParams.get("period") || "30d";

        let companyId = searchParams.get("companyId");

        if (session.user.role === "HR") {
            const company = await prisma.user.findUnique({
                where: { id: session.user.id },
                select: { companyId: true }
            });
            companyId = company?.companyId || null;
            if (exportType === "inventory" || exportType === "categoryDistribution") {
                return NextResponse.json({ error: "HR cannot export inventory analytics" }, { status: 403 });
            }
        }

        if (exportType === "overview") {
            return await exportOverviewAnalytics(dateFrom, dateTo, period, status, companyId);
        }
        if (exportType === "orders") {
            return await exportOrdersAnalytics(dateFrom, dateTo, period, status, companyId);
        }
        if (exportType === "inventory") {
            return await exportInventoryAnalytics(companyId);
        }
        if (exportType === "topClients") {
            return await exportTopUsers(dateFrom, dateTo, period, status, companyId);
        }
        if (exportType === "topProducts") {
            return await exportTopProducts(dateFrom, dateTo, period, status, companyId);
        }

        return NextResponse.json({ error: "Invalid export type" }, { status: 400 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to export analytics" }, { status: 500 });
    }
}

async function buildOrdersFilter(dateFrom: string | null, dateTo: string | null, period: string, status: string | null, companyId?: string | null) {
    const dateFilter: any = {};
    if (dateFrom) dateFilter.gte = new Date(dateFrom);
    if (dateTo) dateFilter.lte = new Date(dateTo);

    if (!dateFrom && !dateTo) {
        const now = new Date();
        const daysBack = period === "7d" ? 7 : period === "90d" ? 90 : 30;
        dateFilter.gte = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    }

    const filters: any = { createdAt: dateFilter };
    if (companyId) filters.companyId = companyId;
    if (status) filters.status = status;

    return filters;
}

async function exportOverviewAnalytics(dateFrom: string | null, dateTo: string | null, period: string, status: string | null, companyId: string | null) {
    const filters = await buildOrdersFilter(dateFrom, dateTo, period, status, companyId);

    const orders = await prisma.order.findMany({ where: filters });
    const totalRevenue = orders.reduce((s, o) => s + (o.amount || 0), 0);
    const avgOrderValue = orders.length ? totalRevenue / orders.length : 0;

    const overview = [
        { Metric: "Total Orders", Value: orders.length },
        { Metric: "Total Revenue", Value: totalRevenue },
        { Metric: "Average Order Value", Value: avgOrderValue }
    ];

    return buildExcelResponse(overview, "overview");
}

async function exportOrdersAnalytics(dateFrom: string | null, dateTo: string | null, period: string, status: string | null, companyId?: string | null) {
    const filters = await buildOrdersFilter(dateFrom, dateTo, period, status, companyId);

    const orders = await prisma.order.findMany({
        where: filters,
        include: { user: { select: { name: true } }, items: true }
    });

    const data = orders.map((o) => ({
        OrderID: o.id,
        Client: o.user?.name || "N/A",
        Items: o.items.length,
        Amount: o.amount,
        Status: o.status,
        Date: new Date(o.createdAt).toLocaleDateString()
    }));

    return buildExcelResponse(data, "orders");
}

async function exportInventoryAnalytics(companyId?: string | null) {
    const products = await prisma.product.findMany({
        where: companyId ? { companies: { some: { id: companyId } } } : {},
        include: { companies: true }
    });

    const data = products.map((p) => ({
        ProductID: p.id,
        Name: p.name,
        Category: p.category,
        Stock: p.availableStock,
        Companies: p.companies.map((c) => c.name).join(", ")
    }));

    return buildExcelResponse(data, "inventory");
}

async function exportTopUsers(dateFrom: string | null, dateTo: string | null, period: string, status: string | null, companyId?: string | null) {
    const filters = await buildOrdersFilter(dateFrom, dateTo, period, status, companyId);

    const orders = await prisma.order.findMany({
        where: filters,
        include: { user: true } 
    });

    const clients: Record<string, any> = {};

    orders.forEach((o) => {
        if (!o.user) return;
        if (!clients[o.user.id]) clients[o.user.id] = { name: o.user.name, revenue: 0, orders: 0 };
        clients[o.user.id].revenue += o.amount || 0;
        clients[o.user.id].orders += 1;
    });

    const data = Object.values(clients)
        .sort((a: any, b: any) => b.revenue - a.revenue)
        .slice(0, 10);

    return buildExcelResponse(data, "top-clients");
}

async function exportTopProducts(dateFrom: string | null, dateTo: string | null, period: string, status: string | null, companyId?: string | null) {
    const filters = await buildOrdersFilter(dateFrom, dateTo, period, status, companyId);

    const orders = await prisma.order.findMany({
        where: filters,
        include: { items: { include: { product: true } } }
    });

    const products: Record<string, any> = {};

    orders.forEach((order) => {
        order.items.forEach((item) => {
            if (!item.product) return;
            if (!products[item.product.id]) products[item.product.id] = { name: item.product.name, quantity: 0 };
            products[item.product.id].quantity += item.quantity;
        });
    });

    const data = Object.values(products)
        .sort((a: any, b: any) => b.quantity - a.quantity)
        .slice(0, 10);

    return buildExcelResponse(data, "top-products");
}

function buildExcelResponse(rows: any[], filenamePrefix: string) {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    const filename = `${filenamePrefix}_${new Date().toISOString().split("T")[0]}.xlsx`;

    return new NextResponse(buffer, {
        headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    });
}
