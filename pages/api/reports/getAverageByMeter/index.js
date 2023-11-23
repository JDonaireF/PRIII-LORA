import { pool } from "@/config/db";
import { getSession } from 'next-auth/react';

export default async function getAveragesByMeter (req, res) {
  const session = await getSession({ req });
  const zone = session.user?.zone;

  if (req.method === 'GET') {
      try {
        const [results] = await pool.query(
          `SELECT ROUND(AVG(C.Consumo), 2) AS Promedio
          FROM Consumo C
          JOIN Medidor M ON M.Id = C.IdMedidor
          WHERE M.Zona = ?
          GROUP BY C.IdMedidor;`,
          [zone]
        );
  
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: 'Only GET requests are accepted' });
    }
  };