import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const role = session.user.role;
  if (role !== 'ADMIN') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    // Get all products with essential information
    const products = await prisma.product.findMany({
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        variants: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get order items separately to calculate sales data
    const orderItemsData = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
        price: true,
      },
      _count: {
        id: true,
      },
    });

    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let page = pdfDoc.addPage([595, 842]); // A4 size
    let y = 800;
    const margin = 40;
    const lineHeight = 14;

    // Header
    page.drawText('Products Export Report', { 
      x: margin, 
      y, 
      size: 18, 
      font: bold,
      color: rgb(0.1, 0.1, 0.1)
    });
    y -= 30;

    page.drawText(`Generated on: ${new Date().toLocaleDateString()}`, { 
      x: margin, 
      y, 
      size: 11, 
      font 
    });
    y -= lineHeight;

    page.drawText(`Total Products: ${products.length}`, { 
      x: margin, 
      y, 
      size: 11, 
      font 
    });
    y -= lineHeight;

    const inStockCount = products.filter(p => p.availableStock > 0).length;
    page.drawText(`In Stock Products: ${inStockCount}`, { 
      x: margin, 
      y, 
      size: 11, 
      font 
    });
    y -= lineHeight;

    const outOfStockCount = products.filter(p => p.availableStock === 0).length;
    page.drawText(`Out of Stock Products: ${outOfStockCount}`, { 
      x: margin, 
      y, 
      size: 11, 
      font 
    });
    y -= 30;

    // Products list
    page.drawText('Product Details:', { 
      x: margin, 
      y, 
      size: 14, 
      font: bold 
    });
    y -= 25;

    for (const product of products) {
      // Check if we need a new page
      if (y < 100) {
        page = pdfDoc.addPage([595, 842]);
        y = 800;
      }

      // Find order data for this product
      const orderData = orderItemsData.find(item => item.productId === product.id);
      const totalSold = orderData?._sum.quantity || 0;
      const totalRevenue = orderData?._sum.price || 0;

      // Product header
      page.drawText(`${product.name} (SKU: ${product.sku})`, { 
        x: margin, 
        y, 
        size: 12, 
        font: bold,
        color: rgb(0.2, 0.2, 0.6)
      });
      y -= lineHeight;

      // Vendor info
      page.drawText(`Vendor: ${product.vendor?.name || 'No Vendor'} | Email: ${product.vendor?.email || 'N/A'}`, { 
        x: margin + 10, 
        y, 
        size: 10, 
        font 
      });
      y -= lineHeight;

      // Category info
      page.drawText(`Category: ${product.category.replace(/_/g, ' ')} | Sub: ${product.subCategory?.replace(/_/g, ' ') || 'N/A'}`, { 
        x: margin + 10, 
        y, 
        size: 10, 
        font 
      });
      y -= lineHeight;

      // Stock and sales info
      const stockStatus = product.availableStock <= 5 ? 'Critical' : product.availableStock <= 10 ? 'Low Stock' : 'In Stock';
      const stockColor = product.availableStock <= 5 ? rgb(0.8, 0.2, 0.2) : product.availableStock <= 10 ? rgb(0.8, 0.6, 0.2) : rgb(0.2, 0.6, 0.2);
      
      page.drawText(`Stock: ${product.availableStock} units (${stockStatus}) | Sold: ${totalSold} units | Revenue: Rs.${totalRevenue}`, { 
        x: margin + 10, 
        y, 
        size: 10, 
        font,
        color: stockColor
      });
      y -= lineHeight;

      // Rating and variants
      const avgRating = product.avgRating ? product.avgRating.toFixed(1) : '0.0';
      page.drawText(`Rating: ${avgRating}/5 (${product.noOfReviews || 0} reviews) | Variants: ${product.variants.length}`, { 
        x: margin + 10, 
        y, 
        size: 10, 
        font 
      });
      y -= lineHeight;

      // Description (truncated)
      if (product.description) {
        const desc = product.description.length > 80 ? 
          product.description.substring(0, 80) + '...' : 
          product.description;
        page.drawText(`Description: ${desc}`, { 
          x: margin + 10, 
          y, 
          size: 9, 
          font,
          color: rgb(0.4, 0.4, 0.4)
        });
        y -= lineHeight;
      }

      // Dates
      page.drawText(`Created: ${new Date(product.createdAt).toLocaleDateString()} | Updated: ${new Date(product.updatedAt).toLocaleDateString()}`, { 
        x: margin + 10, 
        y, 
        size: 9, 
        font,
        color: rgb(0.5, 0.5, 0.5)
      });
      y -= 20; // Extra space between products
    }

    // Generate PDF buffer
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=products-report-${new Date().toISOString().split('T')[0]}.pdf`,
      },
    });

  } catch (error) {
    console.error('PDF Export Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF report', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}