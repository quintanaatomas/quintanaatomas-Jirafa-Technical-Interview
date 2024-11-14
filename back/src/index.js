import express from "express";
import gladiatorMovies from "./routes/gladiatorMoviesRoutes.js"
import movies from "./routes/movieRoutes.js"
import cors from "cors"

const app = express();

app.use(cors());


app.use(gladiatorMovies);
app.use(movies);

app.listen(3000);