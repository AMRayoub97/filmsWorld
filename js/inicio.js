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
            const { title, overview, backdrop_path,popularity,release_date,vote_average } = peli;

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

            const popu = document.createElement('p');
            popu.textContent ="Popularity:" + (popularity ? popularity : 0);
            newDivContent.appendChild(popu);

            const releaseDate = document.createElement('p');
            releaseDate.textContent ="Releas date:" + (release_date ? release_date : '0000-00-00');
            newDivContent.appendChild(releaseDate);

            const voteAverage = document.createElement('p');
            voteAverage.textContent = "vote average:" + (vote_average ? vote_average : '0');
            newDivContent.appendChild(voteAverage);

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
