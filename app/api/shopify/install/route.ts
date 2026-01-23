import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// from your .env
const SHOPIFY_API_KEY = "60691e82e20d3b3550109ed5047c77dd"
const SHOPIFY_SCOPES = "read_assigned_fulfillment_orders,write_assigned_fulfillment_orders,write_draft_orders,read_draft_orders,read_orders,write_orders,read_product_feeds,write_product_feeds,read_product_listings,write_product_listings,read_products,write_products"
const SHOPIFY_CALLBACK_URL = "https://fitplay.life/api/shopify/callback"
//env

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // 1) Read shop from the query you showed
  const shop = searchParams.get('shop'); // "demo-1234837...myshopify.com"

  if (!shop) {
    return new NextResponse('Missing shop param', { status: 400 });
  }

  // 2) Generate a random state string (for now we just generate it; later you can store it)
  const state = crypto.randomBytes(16).toString('hex');

  // 3) Build the OAuth authorize URL
  const authorizeUrl =
    `https://${shop}/admin/oauth/authorize` +
    `?client_id=${SHOPIFY_API_KEY}` +
    `&scope=${encodeURIComponent(SHOPIFY_SCOPES)}` +
    `&redirect_uri=${encodeURIComponent(SHOPIFY_CALLBACK_URL)}` +
    `&state=${state}`;

  // 4) Redirect the browser to Shopify’s permission screen
  return NextResponse.redirect(authorizeUrl);
}