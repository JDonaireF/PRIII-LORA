import { pool } from "@/config/db";
import { getSession } from 'next-auth/react';

export default async function getMeters(req, res) {
       const session = await getSession({ req });
       const number = session.user?.meterNumber;
       console.log(number);

  if (req.method === 'GET') {
    try {
       const [results] = await pool.query(
              `
              SELECT M.Id, M.NumeroMedidor, MAX(C.Consumo) AS Consumo, C.Lectura, MAX(C.FechaActualizacion) AS FechaActualizacion, MAX(F.CostoReal) AS CostoReal
              FROM Medidores M
              JOIN Consumo C ON M.Id = C.IdMedidor
              JOIN Factura F ON M.NumeroMedidor = F.NumeroMedidor
              WHERE M.NumeroMedidor = '${number}'
                AND C.FechaActualizacion BETWEEN NOW() - INTERVAL 3 MONTH AND NOW()
              GROUP BY M.Id, M.NumeroMedidor, C.Lectura;
              
              
              `,
            );

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only GET requests are accepted' });
  }
}
