import { pool } from "@/config/db";
import { getSession } from 'next-auth/react';

export default async function getEnabledDisabled (req, res) {
  const session = await getSession({ req });
  const zone = session.user?.zone;

  if (req.method === 'GET') {
      try {
        const [results] = await pool.query(
          `SELECT
          COUNT(CASE WHEN Estado = 1 THEN Id END) AS Habilitados,
          COUNT(CASE WHEN Estado = 0 THEN Id END) AS Deshabilitados
          FROM Medidor
          WHERE Zona = ?;`,
          [zone]
        );
  
        res.status(200).json(results[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: 'Only GET requests are accepted' });
    }
  };