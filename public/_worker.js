// _worker.js - Cloudflare Pages Worker v4
// FIXES: Cloudflare Pages CORS routing bug (routes Sec-Fetch-Mode:cors requests to index.html)
// Strategy: Buffer asset body for CORS requests; passthrough all others via env.ASSETS.fetch(request)
export default {
  async fetch(request, env) {
    const sfm = request.headers.get('sec-fetch-mode');

    // Only intercept CORS-mode requests (module scripts, dynamically imported chunks)
    if (sfm === 'cors') {
      const url = new URL(request.url);

      // Build clean request: no Origin, no Sec-Fetch-* (bypasses SPA routing bug)
      const cleanHeaders = new Headers();
      const accept = request.headers.get('accept');
      if (accept) cleanHeaders.set('Accept', accept);
      const acceptLang = request.headers.get('accept-language');
      if (acceptLang) cleanHeaders.set('Accept-Language', acceptLang);

      const assetResp = await env.ASSETS.fetch(
        new Request(url.toString(), { method: 'GET', headers: cleanHeaders })
      ).catch(() => null);

      if (assetResp && assetResp.status === 200) {
        const ct = assetResp.headers.get('content-type') || '';
        // Only serve if it is a real asset (not SPA index.html fallback)
        if (!ct.includes('text/html')) {
          // Buffer body - avoids ReadableStream passthrough issues in CF Workers
          const body = await assetResp.arrayBuffer();
          const headers = new Headers(assetResp.headers);
          headers.set('Access-Control-Allow-Origin', '*');
          headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
          headers.set('X-PW-Worker', 'v4');
          return new Response(body, { status: 200, headers });
        }
      }
    }

    // OPTIONS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // All other requests: delegate to normal Pages routing
    return env.ASSETS.fetch(request);
  },
};
