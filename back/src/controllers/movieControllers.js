import { pool } from "../db.js";
import {createPool} from "mysql2/promise";
import axios from 'axios';

const beforeSearch = [];
const apiKey = '173be475' //ambiente

export const getMovies = async (req, res) => {
    const { search } = req.query;
    const results = [];

    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`);
        let movies = response.data.Search;
        for(const movie of movies){
            const[rows, fields] = await pool.query('SELECT * FROM movies WHERE imdbID LIKE ?', [movie.imdbID]);
            let result = rows[0];
            if(!result){
                let response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
                let movieData = response.data;
                console.log(movieData);
                const rating = movieData.Ratings && movieData.Ratings[0] && movieData.Ratings[0].Value;
                const ratingValue = rating ? rating.split('/')[0] : null;
                await pool.query(
                    'INSERT INTO movies (imdbID, title, year, rating, liked, poster) VALUES (?, ?, ?, ?, ?, ?)',
                    [movieData.imdbID, movieData.Title, movieData.Year, ratingValue, 0, movieData.Poster]
                );
                const[rows, fields] = await pool.query('SELECT * FROM movies WHERE imdbID LIKE ?', [movie.imdbID]);
                result = rows[0];
                console.log(result)
            }
            results.push(result);
        }
        res.json(results);
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).json({ message: 'Error al obtener las películas' });
    }
}

export const likeMovie = async (req, res) => {
    const imdbID = req.params.imdbID;
    const liked = req.params.liked;
console.log(liked);
    try {
        console.log(
        await pool.query(
            'UPDATE movies SET liked = ? WHERE imdbID = ?', [liked ? 1 : 0, imdbID]
        ));
        res.json("Se likeo correctamente.")
    } catch (error) {
        console.error('Error al likear las película:', error);
        res.status(500).json({ message: 'Error al likear la película' });
    }
}
