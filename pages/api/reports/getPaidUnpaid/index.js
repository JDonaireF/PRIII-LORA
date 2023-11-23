import { pool } from "@/config/db";
import { getSession } from 'next-auth/react';

export default async function getPaidUnpaid (req, res) {
  const session = await getSession({ req });
  const zone = session.user?.zone;

  if (req.method === 'GET') {
      try {
        const [results] = await pool.query(
          `SELECT
          COUNT(CASE WHEN F.Estado = 1 THEN F.Id END) AS Pagados,
          COUNT(CASE WHEN F.Estado = 0 THEN F.Id END) AS Pendientes
          FROM Factura F
          JOIN Medidor M ON F.IdMedidor = M.Id
          WHERE M.Zona = ?
          GROUP BY EXTRACT(MONTH FROM F.FechaRegistro)
          ORDER BY EXTRACT(MONTH FROM F.FechaRegistro);`,
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