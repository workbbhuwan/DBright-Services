/**
 * Admin API: Request Google Indexing
 *
 * Pings Google and Bing to re-crawl the sitemap and all pages.
 * This is the programmatic equivalent of:
 *   1. Google ping: GET https://www.google.com/ping?sitemap=...
 *   2. Bing ping:   GET https://www.bing.com/indexnow (with API key)
 *   3. IndexNow:    Supported by Bing, Yandex, Seznam, Naver
 *
 * For Google Indexing API (instant indexing), you need a
 * Google Cloud service account — see docs/INDEXING_API.md
 * if you want to set that up later.
 *
 * Usage: POST /api/admin/request-indexing
 * Auth:  Requires admin session cookie
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dbrightservices.com';

const SESSION_SECRET = process.env.SESSION_SECRET || 'change-this-secret-key';

// All public URLs (both locales)
const ALL_URLS = [
  `${SITE_URL}`,
  `${SITE_URL}/services`,
  `${SITE_URL}/company-profile`,
  `${SITE_URL}/contact`,
  `${SITE_URL}/en`,
  `${SITE_URL}/en/services`,
  `${SITE_URL}/en/company-profile`,
  `${SITE_URL}/en/contact`,
];

async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session?.value === SESSION_SECRET;
}

export async function POST() {
  // Auth check
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: Array<{ service: string; url: string; status: string }> = [];

  // 1. Ping Google to re-read sitemap
  try {
    const googlePing = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`,
      { method: 'GET', signal: AbortSignal.timeout(10000) }
    );
    results.push({
      service: 'Google Sitemap Ping',
      url: `${SITE_URL}/sitemap.xml`,
      status: googlePing.ok ? 'success' : `failed (${googlePing.status})`,
    });
  } catch (e) {
    results.push({
      service: 'Google Sitemap Ping',
      url: `${SITE_URL}/sitemap.xml`,
      status: `error: ${e instanceof Error ? e.message : 'unknown'}`,
    });
  }

  // 2. IndexNow — supported by Bing, Yandex, Seznam, Naver
  //    This is the fastest way to notify these search engines.
  //    Requires an API key file at ${SITE_URL}/${key}.txt
  const indexNowKey = process.env.INDEXNOW_API_KEY;
  if (indexNowKey) {
    const engines = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
    ];

    for (const engine of engines) {
      try {
        const res = await fetch(engine, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({
            host: new URL(SITE_URL).hostname,
            key: indexNowKey,
            keyLocation: `${SITE_URL}/${indexNowKey}.txt`,
            urlList: ALL_URLS,
          }),
          signal: AbortSignal.timeout(10000),
        });
        results.push({
          service: `IndexNow (${new URL(engine).hostname})`,
          url: `${ALL_URLS.length} URLs`,
          status: res.ok || res.status === 202 ? 'success' : `failed (${res.status})`,
        });
      } catch (e) {
        results.push({
          service: `IndexNow (${new URL(engine).hostname})`,
          url: `${ALL_URLS.length} URLs`,
          status: `error: ${e instanceof Error ? e.message : 'unknown'}`,
        });
      }
    }
  } else {
    results.push({
      service: 'IndexNow',
      url: 'N/A',
      status: 'skipped — set INDEXNOW_API_KEY env var to enable',
    });
  }

  // 3. Google Indexing API (if service account credentials are configured)
  const googleServiceAccountKey = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON;
  if (googleServiceAccountKey) {
    try {
      const serviceAccount = JSON.parse(googleServiceAccountKey);
      const accessToken = await getGoogleAccessToken(serviceAccount);

      for (const pageUrl of ALL_URLS) {
        try {
          const res = await fetch(
            'https://indexing.googleapis.com/v3/urlNotifications:publish',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                url: pageUrl,
                type: 'URL_UPDATED',
              }),
              signal: AbortSignal.timeout(10000),
            }
          );
          const data = await res.json();
          results.push({
            service: 'Google Indexing API',
            url: pageUrl,
            status: res.ok ? 'success' : `failed: ${data.error?.message || res.status}`,
          });
        } catch (e) {
          results.push({
            service: 'Google Indexing API',
            url: pageUrl,
            status: `error: ${e instanceof Error ? e.message : 'unknown'}`,
          });
        }
      }
    } catch (e) {
      results.push({
        service: 'Google Indexing API',
        url: 'N/A',
        status: `config error: ${e instanceof Error ? e.message : 'invalid JSON'}`,
      });
    }
  } else {
    results.push({
      service: 'Google Indexing API',
      url: 'N/A',
      status: 'skipped — set GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON env var to enable',
    });
  }

  return NextResponse.json({
    message: 'Indexing requests sent',
    timestamp: new Date().toISOString(),
    urls: ALL_URLS,
    results,
    nextSteps: [
      'Go to Google Search Console → URL Inspection → Request Indexing for each URL',
      'This is still the #1 fastest way to get Google to index pages',
      'The API pings above notify crawlers but do not guarantee immediate indexing',
    ],
  });
}

/**
 * Generate a Google OAuth2 access token from a service account.
 * Uses the JWT → access_token flow without any external libraries.
 */
async function getGoogleAccessToken(
  serviceAccount: { client_email: string; private_key: string }
): Promise<string> {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url');

  const unsignedToken = `${encode(header)}.${encode(payload)}`;

  // Import the PEM private key and sign the JWT
  const pemKey = serviceAccount.private_key;
  const pemContents = pemKey
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s/g, '');

  const keyBuffer = Buffer.from(pemContents, 'base64');
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyBuffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );

  const jwt = `${unsignedToken}.${Buffer.from(signature).toString('base64url')}`;

  // Exchange JWT for access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    throw new Error(`Token exchange failed: ${JSON.stringify(tokenData)}`);
  }
  return tokenData.access_token;
}
