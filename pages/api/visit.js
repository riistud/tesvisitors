import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.connection?.remoteAddress ||
    'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  try {
    await sql`
      INSERT INTO visitors (ip, user_agent)
      VALUES (${ip}, ${userAgent})
    `;

    const { rows } = await sql`SELECT COUNT(*) FROM visitors`;
    res.status(200).json({ total: rows[0].count });
  } catch (error) {
    res.status(500).json({ error: 'Database error', detail: error.message });
  }
}
