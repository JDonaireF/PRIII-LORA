import { pool } from "@/config/db";

export default async function getMeterById (req, res) {
    const { id } = req.query;

    if (req.method === 'POST') {
        try {
            const [result] = await pool.query(
                `UPDATE Medidor SET Estado = 0
                 WHERE Id = ?;`,
                [id]
            );

            res.status(200).json({ message: 'Disabled successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: 'Only POST requests are accepted' });
    }
};