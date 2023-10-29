import { pool } from "@/config/db";
import { getSession } from 'next-auth/react';

export default async function getMeters(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
       const [results] = await pool.query(
              `
              SELECT M.Id, M.NumeroMedidor, MAX(C.Consumo) AS Consumo, C.Lectura, MAX(C.FechaActualizacion) AS FechaActualizacion, MAX(F.CostoReal) AS CostoReal
              FROM Medidores M
              JOIN Consumo C ON M.Id = C.IdMedidor
              JOIN Factura F ON M.NumeroMedidor = F.NumeroMedidor
              WHERE M.Id = ?
`,
              [id]
            );

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only GET requests are accepted' });
  }
}
