import { createPool } from "mysql2/promise";

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3308',
    database: 'db_lora'
})

export {pool};