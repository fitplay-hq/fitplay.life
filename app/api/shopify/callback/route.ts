// app/api/shopify/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const SHOPIFY_API_KEY = process.env.SHOPIFY_CLIENT_ID!;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_CLIENT_SECRET!;

// Verify HMAC from Shopify
function verifyHmac(searchParams: URLSearchParams): boolean {
  const hmac = searchParams.get('hmac') || '';

  // build message from all params except hmac, sorted by key
  const params = new URLSearchParams();
  const entries = Array.from(searchParams.entries())
    .filter(([key]) => key !== 'hmac')
    .sort(([a], [b]) => a.localeCompare(b));

  for (const [key, value] of entries) {
    params.append(key, value);
  }

  const message = params.toString();

  const generatedHmac = crypto
    .createHmac('sha256', SHOPIFY_API_SECRET)
    .update(message)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(hmac, 'utf-8'),
      Buffer.from(generatedHmac, 'utf-8'),
    );
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const shop = searchParams.get('shop');
  const code = searchParams.get('code');
  const hmac = searchParams.get('hmac');

  if (!shop || !code || !hmac) {
    return new NextResponse('Missing required params', { status: 400 });
  }

  // 1) Verify HMAC – make sure this really comes from Shopify
  if (!verifyHmac(searchParams)) {
    return new NextResponse('Invalid HMAC', { status: 400 });
  }

  // 2) Exchange code for access token
  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    return new NextResponse(`Error getting access token: ${text}`, { status: 500 });
   
  }
   console.log(tokenRes)

  const tokenJson = await tokenRes.json() as {
    access_token: string;
    scope: string;
  };

  const accessToken = tokenJson.access_token;

  // 3) For now, just log it. Next step is saving to DB.
  console.log('Shopify connected:', {
    shop,
    accessToken: accessToken.slice(0, 6) + '...',
    scope: tokenJson.scope,
  });

  // Later: save { shop, accessToken } to your DB here with Prisma.

  // 4) Redirect to a success page in your app
  return NextResponse.redirect('https://fitplay.life/shopify-connected');
}