import { Router } from "express";
import {getMovies, likeMovie} from "../controllers/movieControllers.js";

const router = Router();

router.get("/movies", getMovies);

router.post("/movies/:imdbID/:liked", likeMovie);


export default router;