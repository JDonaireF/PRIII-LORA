import { pool } from "@/config/db";

export default async function getMeters (req, res) {
    if (req.method === 'GET') {
      try {
        const [results] = await pool.query(
          `SELECT M.Id, M.NumeroMedidor, C.Consumo, C.Lectura, C.FechaActualizacion
          FROM Medidores M
          JOIN Consumo C ON M.Id = C.IdMedidor
          WHERE M.Estado = 1
          AND C.FechaActualizacion = (
              SELECT MAX(C2.FechaActualizacion)
              FROM Consumo C2
              WHERE C2.IdMedidor = M.Id
          )
          ORDER BY M.NumeroMedidor;`,
        );
  
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: 'Only GET requests are accepted' });
    }
  };