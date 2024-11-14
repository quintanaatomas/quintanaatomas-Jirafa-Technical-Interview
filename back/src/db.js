import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "bhn1bhn1",
    port: 3306,
    database: "moviesdb"
})