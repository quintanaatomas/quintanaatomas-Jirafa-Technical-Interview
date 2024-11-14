import axios from 'axios';
import { pool } from './db.js';

export async function consumeAPI(search) {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=173be475&s=${search}`);
      saveDataToDatabase(response.data, search)
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  function saveDataToDatabase(data, searchName) {
    data.movie.forEach(element => {
        const query = 'INSERT INTO movies (imdbID, title, year, rating, liked, poster, search) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [data.imdbID, data.title, data.year, calculateRating(data.imdbID), 0, data.poster, searchName];
      
        pool.query(query, values, (err, result) => {
          if (err) {
            console.error('Error:', err);
          } else {
            console.log('Data saved:', result);
          }
        });
    });

  }

  async function calculateRating(id) {
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=173be475&i=${id}`);
        return 0; //por terminar    
    } catch (error) {
        console.error('Error:', error);
    }
  }
