import { pool } from "@/config/db";

export default async function getMeterById (req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const [results] = await pool.query(
                `SELECT D.*, C.Consumo, C.Lectura
                FROM Deudas D
                JOIN Consumo C ON D.IdMedidor = C.IdMedidor
                WHERE D.IdMedidor = ? AND C.FechaActualizacion = (
                    SELECT MAX(C2.FechaActualizacion)
                    FROM Consumo C2
                    WHERE C2.IdMedidor = D.IdMedidor
                ); `,
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