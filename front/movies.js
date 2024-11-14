document.querySelector("#search-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const searchQuery = document.querySelector("#title").value;

    try {
        fetch(`http://localhost:3000/movies?search=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json())
            .then(movieList => {
                const tableBody = document.querySelector("#movies-table");
                tableBody.innerHTML = '';

                movieList.forEach(movie => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                    <td>${movie.title}</td>
                    <td>${movie.year}</td>
                    <td>${movie.rating}</td>
                    <td class="last-td">
                        <button 
                            class="heart-button ${movie.liked == 1 ? "active" : "inactive"}" 
                            onclick="likeMovie(this, '${movie.imdbID}')">
                            &#9829;
                        </button>
                    </td>`;
                    tableBody.appendChild(row);
                });
            })

    } catch (error) {

    }
});

function likeMovie(button, imdbID) {
    button.classList.toggle("active");
    const liked = button.classList.contains("active");
    const url = `http://localhost:3000/movies/${imdbID}/${liked}`;


    console.log(liked);
    fetch(url, {
        method: 'POST', // or 'PUT'
    })
        .then(async response => {
            console.log( await response.json())
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}