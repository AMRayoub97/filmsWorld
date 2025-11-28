(() => {
    const apiKey = "013abb2fee899b7766b393fb002529dc";
    const totalPages = 5;

    async function fetchAllMovies() {
        let movies = [];
        for (let page = 1; page <= totalPages; page++) {
            const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`);
            const data = await res.json();
            movies = movies.concat(data.results);
        }
        return movies;
    }

    function generarTarjetas(allPelis) {
        const movieGrid = document.querySelector('.movie-grid');
        movieGrid.innerHTML = '';

        allPelis.forEach(peli => {
            const { title, overview, backdrop_path } = peli;

            const newDiv = document.createElement('div');
            newDiv.className = "movie-card";

            const imgPeli = document.createElement('img');
            imgPeli.src = backdrop_path ? `https://image.tmdb.org/t/p/w500${backdrop_path}` : './imgs/logo.PNG';
            newDiv.appendChild(imgPeli);

            const newDivContent = document.createElement('div');
            newDivContent.className = "content";

            const tituloPeli = document.createElement('h3');
            tituloPeli.textContent = title;
            newDivContent.appendChild(tituloPeli);

            const descripcion = document.createElement('p');
            descripcion.textContent = overview ? overview.substring(0, 100) + '...' : 'Sin descripción';
            newDivContent.appendChild(descripcion);

            newDiv.appendChild(newDivContent);
            movieGrid.appendChild(newDiv);
        });
    }

    async function init() {
        const allPelis = await fetchAllMovies();
        generarTarjetas(allPelis);
    }

    init();
})();
