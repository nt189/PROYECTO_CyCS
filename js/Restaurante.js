// Obtener la URL actual
const urlActual = window.location.href;

// Crear un objeto URL
const url = new URL(urlActual);

// Extraer los parámetros
const restauranteParam = url.searchParams.get('restaurante');

// Obtener los datos de los restaurantes desde localStorage
const restaurantes = JSON.parse(localStorage.getItem('Restaurantes'));

if (restaurantes && restauranteParam) {
    // Buscar el restaurante que coincida con el parámetro
    const restaurante = restaurantes.find(r => r.Nombre.toLowerCase() === restauranteParam.toLowerCase());

    if (restaurante) {
        // Actualizar el contenido de la página
        document.querySelector('.imagen img').src = restaurante.Imagen;
        document.querySelector('.contenido h1').textContent = restaurante.Nombre;
        document.querySelector('.contenido p').textContent = restaurante.Descripcion;

        const horariosList = document.querySelector('.horarios ul');
        horariosList.innerHTML = `
            <li>Lunes: ${restaurante.Lunes}</li>
            <li>Martes: ${restaurante.Martes}</li>
            <li>Miércoles: ${restaurante.Miércoles}</li>
            <li>Jueves: ${restaurante.Jueves}</li>
            <li>Viernes: ${restaurante.Viernes}</li>
            <li>Sábado: ${restaurante.Sábado}</li>
            <li>Domingo: ${restaurante.Domingo}</li>
        `;

        const ofertasList = document.querySelector('.ofertas ul');
        ofertasList.innerHTML = `
            <li>Oferta ecológica: ${restaurante["Oferta ecologica"]}</li>
            <li>Oferta por día: ${restaurante["Oferta porDia"]}</li>
            <li>Oferta por hora: ${restaurante["Oferta porHora"]}</li>
            <li>Oferta estudiantes: ${restaurante["Oferta estudiantes"]}</li>
        `;
    } 
    else {
        console.error('Restaurante no encontrado');
    }
} 
else {
    console.error('No hay restaurantes en localStorage o el parámetro no está definido');
}