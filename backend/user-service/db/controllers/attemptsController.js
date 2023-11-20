import pool from '../../database.js';

const addAttempt = async (email, question_id, question_title, code) => {
    const { rows } = await pool.query("INSERT INTO attempts (email, question_id, question_title, code) VALUES ($1, $2, $3, $4)",
        [email, question_id, question_title, code]);

    return rows[0];
};

const getAttemptsByUser = async (email) => {
    const { rows } = await pool.query("SELECT * from attempts where email = $1", [email]);

    return rows;
}

const getAttemptById = async (attempt_id) => {
    const res = await pool.query("SELECT * from attempts where attempt_id = $1", [attempt_id]);

    if (res.rowCount > 0) {
        return res.rows[0]
    }

    return
}

export {
    addAttempt,
    getAttemptsByUser,
    getAttemptById
}
