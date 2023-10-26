import { pool } from "@/config/db";
import { getSession } from 'next-auth/react';

export default async function getMeters (req, res) {
  const session = await getSession({ req });
  const zone = session.user?.zone;

  if (req.method === 'GET') {
      try {
        const [results] = await pool.query(
          `SELECT M.Id, M.NumeroMedidor, C.Consumo, C.Lectura, C.FechaActualizacion, F.CostoReal
          FROM Medidores M
          JOIN Consumo C ON M.Id = C.IdMedidor
          JOIN Factura F ON M.NumeroMedidor = F.NumeroMedidor
          WHERE M.Estado = 1 AND M.Zona = ?
          AND C.FechaActualizacion = (
              SELECT MAX(C2.FechaActualizacion)
              FROM Consumo C2
              WHERE C2.IdMedidor = M.Id
          )
          ORDER BY M.Id;`,
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