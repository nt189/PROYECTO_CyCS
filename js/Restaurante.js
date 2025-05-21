// Obtener la URL actual
const urlActual = window.location.href;

// Crear un objeto URL
const url = new URL(urlActual);

// Extraer los parámetros
const restauranteParam = url.searchParams.get('restaurante');

// Obtener los datos de los restaurantes desde localStorage
const restaurantes = JSON.parse(localStorage.getItem('Restaurantes'));

if (restaurantes && restauranteParam) {
    // Función para normalizar nombres (eliminar caracteres especiales y poner en minúsculas)
    const normalizarNombre = (nombre) => {
        return nombre.toLowerCase()
                   .replace(/'/g, '')       // Elimina apóstrofos
                   .replace(/%27/g, '')     // Elimina %27 (apóstrofo codificado)
                   .replace(/s$/g, '')      // Elimina 's' al final para manejar Vickys vs Vicky's
                   .trim();
    };

    // Buscar el restaurante que coincida con el parámetro
    const restaurante = restaurantes.find(r => 
        normalizarNombre(r.Nombre) === normalizarNombre(restauranteParam)
    );

    if (restaurante) {
        // Actualizar el contenido de la página
        document.querySelector('.imagen img').src = restaurante.Imagen;
        const h1Nombre = document.querySelector('.contenido h1');
        h1Nombre.textContent = restaurante.Nombre;
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

        // Mapeo de ubicaciones
        const ubicaciones = {
        "Vicky's": "https://www.google.com/maps/place/Antojitos+Vicky/@19.0045388,-98.2773088,13175m/data=!3m1!1e3!4m10!1m2!2m1!1santojitos+vicky!3m6!1s0x85cfbf5f95eece99:0x45aa6fdb5d8411c2!8m2!3d19.0045388!4d-98.2010911!15sCg9hbnRvaml0b3Mgdmlja3laESIPYW50b2ppdG9zIHZpY2t5kgESbWV4aWNhbl9yZXN0YXVyYW50qgE4EAEyHxABIhsetFvkbrNqrbAmveelmBu1nokw3nE06mJ4dRYyExACIg9hbnRvaml0b3Mgdmlja3ngAQA!16s%2Fg%2F1ptxfn4l9?entry=ttu",
        "Frullatti": "https://www.google.com/maps/place/Frullatti+Plaza+CU/@18.997094,-98.2798884,13175m/data=!3m2!1e3!5s0x85cfbf5c61418e53:0xe676decf6781eafc!4m10!1m2!2m1!1sfrullatti+puebla!3m6!1s0x85cfbfbd69c60aad:0x5eb051f7abd55cc!8m2!3d18.997094!4d-98.2036707!15sChBmcnVsbGF0dGkgcHVlYmxhWhIiEGZydWxsYXR0aSBwdWVibGGSARJtZXhpY2FuX3Jlc3RhdXJhbnSqAUgQASoNIglmcnVsbGF0dGkoDjIfEAEiG7mdnpwVxfFOPzunXcgEsgXGBe5iWucYgTa3HDIUEAIiEGZydWxsYXR0aSBwdWVibGHgAQA!16s%2Fg%2F11sl__lv3n?entry=ttu",
        "Burguerman": "https://www.google.com.mx/maps/place/Burguerman/@18.9985972,-98.2067163,17z/data=!3m1!4b1!4m6!3m5!1s0x85cfbf5c128af827:0xb36f3aa913dd894!8m2!3d18.9985921!4d-98.204136!16s%2Fg%2F1ptz6pdyy?entry=ttu"
    };


    const claveUbicacion = restaurante.Nombre;
    const enlaceMapa = ubicaciones[claveUbicacion];

    if (enlaceMapa) {
        h1Nombre.style.cursor = 'pointer';
        h1Nombre.addEventListener('click', (e) => {
            e.preventDefault();
             window.location.href= enlaceMapa;
        });
        h1Nombre.title = "Haz clic para ver la ubicación en Google Maps";
    }

        // MINIMAPA (opcional)
        const mapaURLs = {
            "Vicky's": "https://www.google.com/maps/embed/v1/place?q=19.004541952178577,-98.20108976314854&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&zoom=15",
            "Frullatti": "https://www.google.com/maps/embed/v1/place?q=19.002591,-98.200000&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&zoom=15",
            "Burguerman": "https://www.google.com/maps/embed/v1/place?q=19.001000,-98.198000&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&zoom=15"
        };

        const mapaContenedor = document.getElementById('mapPreview');
        const mapaURL = mapaURLs[restaurante.Nombre];
        
        if (mapaURL && mapaContenedor) {
            h1Nombre.addEventListener('mouseenter', () => {
                mapaContenedor.innerHTML = `
                    <iframe 
                        src="${mapaURL}"
                        width="200" 
                        height="150" 
                        style="border:0;" 
                        allowfullscreen>
                    </iframe>
                `;
                const rect = h1Nombre.getBoundingClientRect();
                mapaContenedor.style.left = `${rect.left + window.scrollX}px`;
                mapaContenedor.style.top = `${rect.bottom + window.scrollY + 5}px`;
                mapaContenedor.style.display = 'block';
            });

            h1Nombre.addEventListener('mouseleave', () => {
                mapaContenedor.style.display = 'none';
            });
        }
    } 
    else {
        console.error('Restaurante no encontrado');
    }
} 
else {
    console.error('No hay restaurantes en localStorage o el parámetro no está definido');
}