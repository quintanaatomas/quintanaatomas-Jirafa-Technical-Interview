import { useEffect, useState } from "react";

export function Rows({ submit }) {
  const [moviesList, setMovieList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!submit) return;

    const fetchMoviesList = async () => {
      console.log(`http://localhost:3000/movies?search=${encodeURIComponent(submit)}`);
      try {
        const response = await fetch(`http://localhost:3000/movies?search=${encodeURIComponent(submit)}`);
        if (!response.ok) throw new Error('Error getting moviesList'); 
        const data = await response.json();
        setMovieList(data); 
      } catch (error) {
        setError(error.message); 
      }
    };
    fetchMoviesList();
  }, [submit]);

  const likeMovie = (imdbID, currentLiked) => {
    const url = `http://localhost:3000/movies/${imdbID}/${!currentLiked}`;

    fetch(url, {
      method: 'POST',
    })
      .then(async response => {
        const updatedMovie = await response.json();

        setMovieList(prevMovies => 
          prevMovies.map(movie => 
            movie.imdbID === imdbID 
              ? { ...movie, liked: !currentLiked }
              : movie
          )
        );
      })
      .catch((error) => {
        setError(error.message); 
      });
  };


  if (error) {
    return <div>Error: {error}</div>;
  }


  if (!Array.isArray(moviesList)) {
    return <div>No movies found or error fetching data</div>;
  }

  return (
    <tbody className="movies-tablebody">
      {moviesList.map((movie) => (
        <tr key={movie.imdbID}>
          <td>{movie.title}</td>
          <td>{movie.year}</td>
          <td>{movie.rating}</td>
          <td className="last-td">
            <button
              className="likebutton"
              onClick={() => likeMovie(movie.imdbID, movie.liked)}
              style={{ backgroundColor: movie.liked ? "red" : "gray" }}
            >
                {/* Modificar boton */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}