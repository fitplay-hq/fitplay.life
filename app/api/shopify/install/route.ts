import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';


const SHOPIFY_API_KEY = process.env.SHOPIFY_CLIENT_ID!;
const SHOPIFY_SCOPES = process.env.SHOPIFY_SCOPES!;
const SHOPIFY_CALLBACK_URL = process.env.CALLBACK_URL!;


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);


  const shop = searchParams.get('shop'); 

  if (!shop) {
    return new NextResponse('Missing shop param', { status: 400 });
  }


  const state = crypto.randomBytes(16).toString('hex');

  
  const authorizeUrl =
    `https://${shop}/admin/oauth/authorize` +
    `?client_id=${SHOPIFY_API_KEY}` +
    `&scope=${encodeURIComponent(SHOPIFY_SCOPES)}` +
    `&redirect_uri=${encodeURIComponent(SHOPIFY_CALLBACK_URL)}` +
    `&state=${state}`;

  return NextResponse.redirect(authorizeUrl);
}