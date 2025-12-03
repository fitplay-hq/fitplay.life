import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Fetch products and extract unique categories from database
    const products = await prisma.product.findMany({
      select: {
        category: true
      }
    });

    // Get unique categories from products
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

    // Function to format category names from database
    const formatCategoryName = (category: string) => {
      return category
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/And/g, "&") // Replace "And" with "&"
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    };

    // Function to get appropriate image for category
    const getCategoryImage = (category: string) => {
      if (category.includes("Nutrition")) {
        return "https://images.unsplash.com/photo-1593181581874-361761582b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbGVtZW50cyUyMHZpdGFtaW5zJTIwbnV0cml0aW9ufGVufDF8fHx8MTc1Nzc1MTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080";
      } else if (category.includes("Diagnostics")) {
        return "https://images.unsplash.com/photo-1745256375848-1d599594635d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWFyYWJsZXMlMjBmaXRuZXNzJTIwdHJhY2tlciUyMHNtYXJ0d2F0Y2h8ZW58MXx8fHwxNzU3NzUxMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080";
      } else if (category.includes("Fitness")) {
        return "https://images.unsplash.com/photo-1652492041264-efba848755d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXF1aXBtZW50JTIwZHVtYmJlbGxzJTIwZ3ltfGVufDF8fHx8MTc1Nzc1MTE1NHww&ixlib=rb-4.1.0&q=80&w=1080";
      } else if (category.includes("Ergonomics")) {
        return "https://images.unsplash.com/photo-1740748776786-74365e440be4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvdmVyeSUyMHRoZXJhcHklMjBtYXNzYWdlJTIwc3BhfGVufDF8fHx8MTc1Nzc1MTE2Mnww&ixlib=rb-4.1.0&q=80&w=1080";
      } else if (category.includes("Wellness") || category.includes("Services")) {
        return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
      }
      return "https://images.unsplash.com/photo-1613637069737-2cce919a4ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG51dHJpdGlvbiUyMGhlYWx0aHklMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzU3NzUxMTY1fDA&ixlib=rb-4.1.0&q=80&w=1080";
    };

    // Build categories array starting with "All Products"
    const categories = [
      {
        value: "all",
        label: "All Products",
        image: "https://images.unsplash.com/photo-1613637069737-2cce919a4ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG51dHJpdGlvbiUyMGhlYWx0aHklMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzU3NzUxMTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Complete Wellness Range",
      },
      // Add categories that actually exist in the database with real names
      ...uniqueCategories.map(category => ({
        value: category,
        label: formatCategoryName(category), // Use real formatted database name
        image: getCategoryImage(category),
        description: `${formatCategoryName(category)} products`
      }))
    ];

    console.log('Fetched categories from database:', uniqueCategories);
    console.log('Returning categories:', categories);

    return new NextResponse(JSON.stringify({ categories }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch categories" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}