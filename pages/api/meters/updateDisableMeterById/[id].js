import { pool } from "@/config/db";

export default async function getMeterById (req, res) {
    const { id } = req.query;

    if (req.method === 'POST') {
        try {
            const [results] = await pool.query(
                `UPDATE Medidores SET Estado = 0
                 WHERE Id = ?;`,
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