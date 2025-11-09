import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const role = session.user.role;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'orders';

  if (role === 'HR' && type !== 'orders')
    return NextResponse.json({ error: 'HR can export orders only' }, { status: 403 });

  if (role !== 'ADMIN' && role !== 'HR')
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });

  if (type === 'orders') return exportOrders(request);
  if (type === 'inventory') return exportInventory(request);

  return NextResponse.json({ error: 'Invalid export type' }, { status: 400 });
}

async function exportOrders(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  const clientId = searchParams.get('clientId');
  const companyId = searchParams.get('companyId');
  const status = searchParams.get('status');

  const filters: any = {};
  if (dateFrom || dateTo) {
    filters.createdAt = {};
    if (dateFrom) filters.createdAt.gte = new Date(dateFrom);
    if (dateTo) filters.createdAt.lte = new Date(dateTo);
  }
  if (clientId) filters.clientId = clientId;
  if (companyId) filters.companyId = companyId;
  if (status) filters.status = status;

  const orders = await prisma.order.findMany({
    where: filters,
    include: {
      user: true,
      items: { include: { product: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 100
  });

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([595, 842]);
  let y = 800;
  const m = 40;
  const lh = 14;

  page.drawText('Orders Analytics Export', { x: m, y, size: 18, font: bold });
  y -= 30;

  for (const o of orders) {
    if (y < 80) {
      page = pdfDoc.addPage([595, 842]);
      y = 800;
    }

    const addr = o.address

    page.drawText(`Order #${o.id.slice(-8)} | Rs.${o.amount} | ${new Date(o.createdAt).toLocaleDateString()}`, { x: m, y, size: 11, font: bold });
    y -= lh;
    page.drawText(`Client: ${o.user?.name || 'N/A'} | Status: ${o.status}`, { x: m, y, size: 10, font });
    y -= lh;
    page.drawText(`Shipping: ${addr || 'N/A'}`, { x: m, y, size: 10, font });
    y -= lh;

    page.drawText(`Items:`, { x: m + 10, y, size: 10, font: bold });
    y -= lh;

    for (const i of o.items) {
      if (y < 60) {
        page = pdfDoc.addPage([595, 842]);
        y = 800;
      }
      page.drawText(`• ${i.product?.name || ''} | Qty: ${i.quantity} | Rs.${i.price}`, {
        x: m + 20,
        y,
        size: 9,
        font,
        color: rgb(0.2, 0.2, 0.2)
      });
      y -= lh;
    }

    y -= 20;
  }

  const pdf = await pdfDoc.save();
  const filename = `orders_${Date.now()}.pdf`;

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}

async function exportInventory(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId');

  const filters: any = {};
  if (companyId) filters.companyId = companyId;

  const products = await prisma.product.findMany({
    where: filters,
    include: { companies: true, variants: true },
    orderBy: { name: 'asc' },
    take: 150
  });

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([595, 842]);
  let y = 800;
  const m = 40;
  const lh = 14;

  page.drawText('Inventory Analytics Export', { x: m, y, size: 18, font: bold });
  y -= 30;

  for (const p of products) {
    if (y < 80) {
      page = pdfDoc.addPage([595, 842]);
      y = 800;
    }

    const stock = p.availableStock;
    // derive a price from variants (use first variant price or 0 if none)
    const variantPrice = p.variants && p.variants.length ? (p.variants[0].mrp ?? 0) : 0;
    const stockValue = variantPrice * stock;

    page.drawText(`${p.name}`, { x: m, y, size: 12, font: bold });
    y -= lh;
    page.drawText(`SKU: ${p.sku || 'N/A'} | Category: ${Array.isArray(p.category) ? p.category.join(', ') : p.category || 'N/A'}`, { x: m, y, size: 10, font });
    y -= lh;
    page.drawText(`Stock: ${stock} | Price: Rs.${variantPrice} | Value: Rs.${stockValue}`, { x: m, y, size: 10, font });
    y -= lh;
    page.drawText(`Companies: ${p.companies.map(c => c.name).join(', ')}`, { x: m, y, size: 10, font });
    y -= 25;
  }

  const pdf = await pdfDoc.save();
  const filename = `inventory_${Date.now()}.pdf`;

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
