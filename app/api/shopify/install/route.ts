import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// from your .env
const SHOPIFY_API_KEY = process.env.SHOPIFY_CLIENT_ID!;
const SHOPIFY_SCOPES = process.env.SHOPIFY_SCOPES!; // e.g. "read_products,write_orders"
const SHOPIFY_CALLBACK_URL = process.env.CALLBACK_URL!; // e.g. "https://fitplay.life/api/shopify/callback"
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