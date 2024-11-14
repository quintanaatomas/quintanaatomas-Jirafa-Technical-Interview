import { pool } from "../db.js";

export const getGladiatorMovies = async (req, res) => {
    const result = await pool.query('SELECT * FROM gladiatorMovies');
    res.json(result[0]);
}