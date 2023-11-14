import { pool } from "@/config/db";
import { getSession } from 'next-auth/react';

export default async function getMeters(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [results] = await pool.query(
              `SELECT * FROM Factura
              WHERE Id = ?
              ORDER BY id DESC LIMIT 1;`,
              [id]
            );

      res.status(200).json(results[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only GET requests are accepted' });
  }
}
