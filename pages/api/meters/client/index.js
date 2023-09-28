import { pool } from "@/config/db";

export default async function getMeters (req, res) {

       if (req.method === 'GET') {
   
         try {
   
           const [results] = await pool.query(
   
             `
             SELECT
    M.NumeroMedidor,
    C.Consumo,
    C.Lectura,
    C.FechaActualizacion,
    M.Zona,
    M.Id,
    CASE
        WHEN M.Zona = 'Zona A' THEN C.Consumo * 0.1
        WHEN M.Zona = 'Zona B' THEN C.Consumo * 0.2
        WHEN M.Zona = 'Zona C' THEN C.Consumo * 0.4
        ELSE C.Consumo * 1.0 -- Tarifa predeterminada si la zona no coincide con ninguna de las anteriores
    END AS CostoReal
FROM
    Medidores M
JOIN
    Consumo C ON M.Id = C.IdMedidor
WHERE
    M.Estado = 1;

             `,
   
           );
   
    
   
           res.status(200).json(results);
   
         } catch (error) {
   
           res.status(500).json({ error: error.message });
   
         }
   
       } else {
   
         res.status(400).json({ error: 'Only GET requests are accepted' });
   
       }
   
     };