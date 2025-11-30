import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import * as XLSX from 'xlsx';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'excel';

    // Get all products with detailed information
    const products = await prisma.product.findMany({
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        variants: {
          select: {
            id: true,
            variantCategory: true,
            variantValue: true,
            mrp: true,
          },
        },

        orderItems: {
          select: {
            quantity: true,
            credits: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate real ratings and sales
    const exportData = products.map((product) => {
      const avgRating = product.avgRating ? product.avgRating.toFixed(1) : '0.0';
      
      const totalSold = product.orderItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalRevenue = product.orderItems.reduce((sum, item) => sum + (item.quantity * (item.credits || 0)), 0);
      
      return {
        'Product ID': product.id,
        'Product Name': product.name,
        'SKU': product.sku,
        'Vendor Name': product.vendor?.name || 'No Vendor',
        'Vendor Email': product.vendor?.email || 'N/A',
        'Category': product.category.replace(/_/g, ' '),
        'Sub Category': product.subCategory?.replace(/_/g, ' ') || 'N/A',
        'Description': product.description?.substring(0, 100) + (product.description?.length > 100 ? '...' : '') || '',
        'Current Stock': product.availableStock,
        'Stock Status': product.availableStock <= 5 ? 'Critical' : product.availableStock <= 10 ? 'Low Stock' : 'In Stock',
        'Average Rating': avgRating,
        'Total Reviews': product.noOfReviews || 0,
        'Total Sold': totalSold,
        'Total Revenue (Credits)': totalRevenue,
        'Variants Count': product.variants.length,
        'Created Date': new Date(product.createdAt).toLocaleDateString(),
        'Last Updated': new Date(product.updatedAt).toLocaleDateString(),
        'Status': product.availableStock > 0 ? 'Active' : 'Out of Stock',
      };
    });

    if (format === 'excel') {
      // Create professional Excel file
      const workbook = XLSX.utils.book_new();
      
      // Create summary data
      const summaryData = [
        ['Products Export Report'],
        ['Generated on', new Date().toLocaleDateString()],
        ['Total Products', products.length],
        ['In Stock Products', products.filter(p => p.availableStock > 0).length],
        ['Out of Stock Products', products.filter(p => p.availableStock === 0).length],
        ['Low Stock Products', products.filter(p => p.availableStock > 0 && p.availableStock <= 10).length],
        ['Average Rating', products.length > 0 ? (products.reduce((sum, p) => sum + (p.avgRating || 0), 0) / products.length).toFixed(2) : '0.00'],
        [''], // Empty row
      ];
      
      // Create detailed products worksheet
      const detailedData = [summaryData, [Object.keys(exportData[0] || {})], ...exportData.map(obj => Object.values(obj))].flat();
      const worksheet = XLSX.utils.aoa_to_sheet(detailedData);
      
      // Style the worksheet
      worksheet['!cols'] = [
        { wch: 15 }, { wch: 25 }, { wch: 15 }, { wch: 20 }, { wch: 25 },
        { wch: 20 }, { wch: 15 }, { wch: 30 }, { wch: 12 }, { wch: 12 },
        { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 12 },
        { wch: 15 }, { wch: 15 }, { wch: 12 }
      ];
      
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Products Report');
      
      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
      
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename=products-report-${new Date().toISOString().split('T')[0]}.xlsx`,
        },
      });
      
    } else if (format === 'pdf') {
      // Create HTML report that can be printed as PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>FitPlay Products Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #059669; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .header-info { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>FitPlay Products Report</h1>
          <div class="header-info">
            <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Total Products:</strong> ${products.length}</p>
          </div>
          <table>
            <thead>
              <tr>
                ${Object.keys(exportData[0] || {}).map(key => `<th>${key}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${exportData.map(product => 
                `<tr>${Object.values(product).map(value => `<td>${value}</td>`).join('')}</tr>`
              ).join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;

      return new NextResponse(htmlContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': `attachment; filename=products-${new Date().toISOString().split('T')[0]}.html`,
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid format. Use 'excel' or 'pdf'" },
      { status: 400 }
    );

  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}