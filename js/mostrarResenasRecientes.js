const todosComentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
console.log(todosComentarios);

const restaurantesReseñas = ["Vicky's", "Frullatti", "Burguerman"];

restaurantesReseñas.forEach(nombre => {
  const reseñas = todosComentarios[nombre] || [];
  const contenedor = document.getElementById(`review-list-${nombre.toLowerCase().replace(/[^a-z0-9]/g, '')}`);

  if (contenedor) {
    contenedor.innerHTML = '';

    if (reseñas.length === 0) {
      const mensaje = document.createElement('p');
      mensaje.textContent = 'No hay reseñas para mostrar';
      contenedor.appendChild(mensaje);
    } else {
      const titulo = document.createElement('h3');
      titulo.textContent = 'Reseñas';
      contenedor.appendChild(titulo);

      // Ordenar reseñas por fecha descendente (más reciente primero)
      reseñas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      // Tomar las dos más recientes
      const recientes = reseñas.slice(0, 2);

      recientes.forEach(r => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `
          <b><span>-${r.nombre}:</span></b>
          <span>${r.texto}</span>
        `;
        contenedor.appendChild(div);
      });
    }
  }
});
