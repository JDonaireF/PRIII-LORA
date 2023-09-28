import { pool } from "@/config/db";

export default async function getMeterById (req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const [results] = await pool.query(
                `SELECT C.Consumo, C.Lectura, C.FechaActualizacion
                FROM Medidores M
                JOIN Consumo C ON M.Id = C.IdMedidor
                WHERE M.Estado = 1 AND M.Id = ?`,
                [id]
            );

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: 'Only GET requests are accepted' });
    }
};