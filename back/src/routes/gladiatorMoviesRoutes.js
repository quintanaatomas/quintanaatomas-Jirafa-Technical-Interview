import { Router } from "express";
import {getGladiatorMovies} from "../controllers/gladiatorMoviesControllers.js";

const router = Router();

router.get("/gladiatorMovies", getGladiatorMovies);

export default router;