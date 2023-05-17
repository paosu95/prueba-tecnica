let peliculas = [];

function obtenerDatosAPI() {
  return fetch('peliculas.json')
    .then((response) => response.json())
    .then((data) => {
      peliculas = data; // Almacenar las películas en la variable global
      mostrarTodasPeliculas();
    })
    .catch((error) => {
      // Manejar errores en la solicitud
      console.error('Error al obtener los datos de la API:', error);
    });
}

function pintar(peliculasFiltradas) {
  const datosContainer = document.getElementById('datos-container');
  datosContainer.innerHTML = ''; // Limpiar el contenido previo del contenedor

  for (let pelicula of peliculasFiltradas) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const a = document.createElement('a');
    const button = document.createElement('button');

    div.classList.add('poster');
    img.src = pelicula.Poster;
    a.appendChild(button);
    a.href = 'index2.html/?id=' + pelicula.imdbID;
    button.textContent = 'Show';

    div.appendChild(img);
    div.appendChild(a);
    datosContainer.appendChild(div);
  }
}

function mostrarTodasPeliculas() {
  pintar(peliculas);
}

function mostrarPeliculasMayor() {
  // Obtener el año mayor
  let maxYear = 0;
  for (let pelicula of peliculas) {
    if (parseInt(pelicula.Year) > maxYear) {
      maxYear = parseInt(pelicula.Year);
    }
  }

  // Filtrar las películas por el año mayor
  const peliculasMayor = peliculas.filter(
    (pelicula) => parseInt(pelicula.Year) === maxYear,
  );

  pintar(peliculasMayor);
}

function mostrarPeliculasMetascore() {
  const metascoreFilter = 70; // Valor de metascore para filtrar

  // Filtrar las películas por metascore mayor a 70
  const peliculasFiltradas = peliculas.filter(
    (pelicula) => parseInt(pelicula.Metascore) > metascoreFilter,
  );

  pintar(peliculasFiltradas);
}

function mostrarPeliculasImdbRating() {
  const ratingFilter = 7.0; // Valor de imdbRating para filtrar

  // Filtrar las películas por imdbRating igual o mayor a 7.0
  const peliculasFiltradas = peliculas.filter(
    (pelicula) => parseFloat(pelicula.imdbRating) >= ratingFilter,
  );

  pintar(peliculasFiltradas);
}

function mostrarPeliculasImdbVotes() {
  let maxVotes = 0;

  for (let pelicula of peliculas) {
    const imdbVotes = parseInt(pelicula.imdbVotes.replaceAll(',', ''));

    if (imdbVotes > maxVotes) {
      maxVotes = imdbVotes;
    }
  }

  const peliculasMayorImdbVotes = peliculas.filter((pelicula) => {
    const imdbVotes = parseInt(pelicula.imdbVotes.replaceAll(',', ''));

    return imdbVotes === maxVotes;
  });

  pintar(peliculasMayorImdbVotes);
}

// Llamar a la función para obtener los datos de la API al cargar la página
obtenerDatosAPI().catch((error) => {
  console.error('Error al obtener los datos de la API:', error);
});

document
  .getElementById('peliculasAll')
  .addEventListener('click', mostrarTodasPeliculas);

document
  .getElementById('peliculasNewReleases')
  .addEventListener('click', mostrarPeliculasMayor);

document
  .getElementById('peliculasMetascore')
  .addEventListener('click', mostrarPeliculasMetascore);

document
  .getElementById('PeliculasImdbRating')
  .addEventListener('click', mostrarPeliculasImdbRating);

document
  .getElementById('btnMostrarMayorImdbVotes')
  .addEventListener('click', mostrarPeliculasImdbVotes);
