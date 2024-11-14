import express from "express";
import movies from "./routes/movieRoutes.js"
import cors from "cors"

const app = express();

app.use(cors());

app.use(movies);

app.listen(3000);