//recomendaciones
const containerMovies = document.querySelector("#container-movies");

const buttonPrev = document.querySelector("#button-prev");
const buttonNext = document.querySelector("#button-next");

fetch("http://localhost:3000/movies?search=Gladiator")
    .then(res => res.json())
    .then(response => {
        const recommendationsList = response;

        recommendationsList.forEach(movie => {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie");

            const movieImg = document.createElement("img");
            movieImg.src = movie.poster;

            movieDiv.appendChild(movieImg);
        
            containerMovies.appendChild(movieDiv);
        });


        let movies = document.querySelectorAll(".movie");
        let lastMovie = movies[movies.length - 1];

        containerMovies.insertAdjacentElement("afterbegin", lastMovie);


        function next() {
            let firstMovie = document.querySelectorAll(".movie")[0];
            containerMovies.style.marginLeft = "-65.5%";
            containerMovies.insertAdjacentElement("beforeend", firstMovie);
            containerMovies.style.marginLeft = "-32.5%";
        }

        function prev() {
            let movies = document.querySelectorAll(".movie");
            let lastMovie = movies[movies.length - 1];
            containerMovies.style.marginLeft = "0.5%";
            containerMovies.insertAdjacentElement("afterbegin", lastMovie);
            containerMovies.style.marginLeft = "-32.5%";
        }
        
        buttonNext.addEventListener("click", function(){ next();});
        buttonPrev.addEventListener("click", function(){ prev();});
    })
    .catch(error => {
        console.error("Error fetching recommendationsList:", error);
    });
