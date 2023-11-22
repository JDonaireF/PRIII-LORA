import { pool } from "@/config/db";

export default async function getMeterById (req, res) {
    const { id } = req.query;

    if (req.method === 'POST') {
        try {
            const { rate } = req.body;
            
            const [result] = await pool.query(
                `UPDATE Consumo
                SET Costo = Consumo * ?
                WHERE IdMedidor = ?;`,
                [rate, id]
            );

            res.status(200).json({ message: 'Rate updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: 'Only POST requests are accepted' });
    }
};