import { pool } from "@/config/db";
import { getSession } from 'next-auth/react';

export default async function getMeterByNumber(req, res) {
  const session = await getSession({ req });
  const number = session.user?.meterNumber;

  if (req.method === 'GET') {
    try {
      const [results] = await pool.query(
              `SELECT * FROM Medidor
              WHERE NumeroMedidor = '${number}';`,
            );

      res.status(200).json(results[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only GET requests are accepted' });
  }
}
