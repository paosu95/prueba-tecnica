function obtenerDatosAPI() {
    const query = new URLSearchParams(location.search);
  
    fetch('/peliculas.json')
      .then((response) => response.json())
      .then((peliculas) => {
        const title = document.getElementById('titulo');
        const poster = document.getElementById('poster');
        const description = document.getElementById('description');
        const btnFavorito = document.getElementById('btnFavorito');
  
        const pelicula = peliculas.find(p => p.imdbID === query.get("id"));
  
        title.textContent = pelicula.Title;
        poster.src = pelicula.Poster;
        description.textContent = pelicula.Plot;
  
        // Agregar el evento de clic al botón de favorito
        btnFavorito.addEventListener("click", () => {
          // Guardar la película en favoritos
          guardarEnFavoritos(pelicula);
  
          // Cambiar el estado del botón a "Agregado a favoritos"
          btnFavorito.textContent = "Agregado a favoritos";
          btnFavorito.disabled = true;
        });
      })
      .catch((error) => {
        // Manejar errores en la solicitud
        console.error('Error al obtener los datos de la API:', error);
      });
  }
  
  function guardarEnFavoritos(pelicula) {
    // Obtener los favoritos existentes del localStorage
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  
    // Verificar si la película ya está en favoritos
    const existeEnFavoritos = favoritos.some(f => f.imdbID === pelicula.imdbID);
  
    if (!existeEnFavoritos) {
      // Agregar la película a favoritos
      favoritos.push(pelicula);
  
      // Actualizar los favoritos en el localStorage
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
  
      console.log("Película agregada a favoritos");
    } else {
      console.log("La película ya está en favoritos");
    }
  }
  
  obtenerDatosAPI();