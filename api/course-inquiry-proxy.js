export default async function handler(req, res) {
  const target = 'https://newusbackend.vercel.app/course-inquiry';

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return res.status(204).end();
  }

  // Read raw request body
  const getRawBody = (req) => new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

  try {
    const rawBody = req.method === 'GET' ? undefined : await getRawBody(req);

    // Build headers for proxied request (exclude host)
    const forwardedHeaders = {};
    for (const [k, v] of Object.entries(req.headers || {})) {
      if (k.toLowerCase() === 'host') continue;
      forwardedHeaders[k] = v;
    }

    const fetchRes = await fetch(target, {
      method: req.method,
      headers: forwardedHeaders,
      body: rawBody,
      redirect: 'follow'
    });

    // Copy response headers (but set CORS to allow frontend)
    fetchRes.headers.forEach((value, key) => {
      // Avoid sending backend's CORS headers which may be restrictive
      if (!key.toLowerCase().startsWith('access-control-')) {
        res.setHeader(key, value);
      }
    });

    // Allow the frontend origin (use wildcard or reflect origin as needed)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    const arrayBuf = await fetchRes.arrayBuffer();
    res.status(fetchRes.status).send(Buffer.from(arrayBuf));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
