const categoriasNombres = {
    Calcom: "Calidad de Comida",
    SerCli: "Servicio al Cliente",
    CalPre: "Calidad-Precio",
    Amb: "Ambiente",
    Sos: "Sostenibilidad"
};

// Mostrar sección de comentarios solo si está logueado
function seccioncomentarios() {
    if (sessionStorage.getItem('id')) {
        var div = document.createElement('div');
        var comentario = `
            <div class="restaurant-detail-view">
                <h3 class="rating-title">Calidad de Comida</h3>
                <div class="Calcom star-container">
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                </div>
                
                <h3 class="rating-title">Servicio al cliente</h3>
                <div class="SerCli star-container">
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                </div>
                
                <h3 class="rating-title">Calidad-Precio</h3>
                <div class="CalPre star-container">
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                </div>
                
                <h3 class="rating-title">Ambiente</h3>
                <div class="Amb star-container">
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                </div>
                
                <h3 class="rating-title">Sostenibilidad</h3>
                <div class="Sos star-container">
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                    <i class="bi bi-star-fill star"></i>
                </div>

                <form>
                    <label for="comentario">Comentario:</label>
                    <textarea style="width: 100%; height: 100px; box-sizing: border-box;" id="comentario"></textarea>
                    <input type="button" onclick="cargarcomentario()" value="Compartir" id="review-btn-share" name="comentario">
                </form>
            </div>`;
        div.innerHTML = comentario;
        document.getElementById('mainComentarios').appendChild(div);
        inicializarEstrellas();
    }
}

// Inicializar eventos de las estrellas
function inicializarEstrellas() {
    document.querySelectorAll('.star-container').forEach(container => {
        const stars = container.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                stars.forEach(s => s.classList.remove('checked'));
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.add('checked');
                }
            });
        });
    });
}

// Cargar comentarios específicos del restaurante
function comentarios() {
    try {
        const idRestaurante = document.getElementById('restaurante-id').value;
        if (!idRestaurante) {
            console.error('No se encontró ID de restaurante');
            return;
        }

        const contenedor = document.querySelector('.user-reviews');
        if (!contenedor) {
            console.error('No se encontró el contenedor de comentarios');
            return;
        }

        // Mantener el título
        contenedor.innerHTML = '<h3>Reseñas de usuarios:</h3>';

        // Cargar comentarios
        const todosComentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
        const comentariosRestaurante = todosComentarios[idRestaurante] || [];
        
        console.log('Comentarios a mostrar:', comentariosRestaurante);
        
        comentariosRestaurante.forEach(comentario => {
            mostrarComentario(comentario);
        });
    } catch (error) {
        console.error('Error al cargar comentarios:', error);
    }
}
/*
// Guardar nuevo comentario
function cargarcomentario() {
    try {
        const idUsuario = sessionStorage.getItem('id');
        const idRestaurante = document.getElementById('restaurante-id').value;
        const textoComentario = document.getElementById('comentario').value;
        const usr = JSON.parse(localStorage.getItem('Usuarios'));

        if (!idUsuario || !usr) {
            alert('Debes iniciar sesión para comentar');
            return;
        }

        if (!textoComentario.trim()) {
            alert('Por favor escribe un comentario');
            return;
        }

        // Obtener calificaciones
        const ratings = {
            Calcom: document.querySelectorAll('.Calcom .star.checked').length,
            SerCli: document.querySelectorAll('.SerCli .star.checked').length,
            CalPre: document.querySelectorAll('.CalPre .star.checked').length,
            Amb: document.querySelectorAll('.Amb .star.checked').length,
            Sos: document.querySelectorAll('.Sos .star.checked').length
        };

        // Crear objeto comentario
        const nuevoComentario = {
            texto: textoComentario,
            calificaciones: ratings,
            usuario: usr[idUsuario][0],
            fecha: new Date().toLocaleString()
        };

        // Guardar en localStorage
        let todosComentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
        
        if (!todosComentarios[idRestaurante]) {
            todosComentarios[idRestaurante] = [];
        }
        
        todosComentarios[idRestaurante].push(nuevoComentario);
        localStorage.setItem('comentarios', JSON.stringify(todosComentarios));

        // Mostrar el nuevo comentario
        mostrarComentario(nuevoComentario);
        document.getElementById('comentario').value = '';

        console.log('Datos guardados:', JSON.parse(localStorage.getItem('comentarios')));
    } catch (error) {
        console.error('Error al guardar comentario:', error);
        alert('Ocurrió un error al guardar el comentario');
    }
}*/

// Guardar nuevo comentario
function cargarcomentario() {
    try {
        const idUsuario = sessionStorage.getItem('id');
        const idRestaurante = document.getElementById('restaurante-id').value;
        const textoComentario = document.getElementById('comentario').value;
        const usr = JSON.parse(localStorage.getItem('Usuarios'));

        if (!idUsuario || !usr) {
            alert('Debes iniciar sesión para comentar');
            return;
        }

        if (!textoComentario.trim()) {
            alert('Por favor escribe un comentario');
            return;
        }

        // Obtener calificaciones
        const ratings = {
            Calcom: document.querySelectorAll('.Calcom .star.checked').length,
            SerCli: document.querySelectorAll('.SerCli .star.checked').length,
            CalPre: document.querySelectorAll('.CalPre .star.checked').length,
            Amb: document.querySelectorAll('.Amb .star.checked').length,
            Sos: document.querySelectorAll('.Sos .star.checked').length
        };

        // Crear objeto comentario
        const nuevoComentario = {
            texto: textoComentario,
            calificaciones: ratings,
            usuario: usr[idUsuario][0],
            fecha: new Date().toLocaleString()
        };

        // Guardar en localStorage
        let todosComentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
        
        if (!todosComentarios[idRestaurante]) {
            todosComentarios[idRestaurante] = [];
        }
        
        todosComentarios[idRestaurante].push(nuevoComentario);
        localStorage.setItem('comentarios', JSON.stringify(todosComentarios));

        // Mostrar el nuevo comentario
        mostrarComentario(nuevoComentario);
        
        // Limpiar el textarea y las estrellas
        document.getElementById('comentario').value = '';
        reiniciarEstrellas();

        console.log('Datos guardados:', JSON.parse(localStorage.getItem('comentarios')));
    } catch (error) {
        console.error('Error al guardar comentario:', error);
        alert('Ocurrió un error al guardar el comentario');
    }
}

// Función para reiniciar las estrellas
function reiniciarEstrellas() {
    document.querySelectorAll('.star-container .star').forEach(star => {
        star.classList.remove('checked');
    });
}

// Mostrar un comentario
function mostrarComentario(comentario) {
    const contenedor = document.querySelector('.user-reviews');
    if (!contenedor) return;

    let estrellasHTML = '';
    for (const [categoria, puntuacion] of Object.entries(comentario.calificaciones)) {
        const nombreCompleto = categoriasNombres[categoria] || categoria;
        estrellasHTML += `
            <div class="rating-category">
                <strong>${nombreCompleto}:</strong>
                ${'★'.repeat(puntuacion)}${'☆'.repeat(5 - puntuacion)}
            </div>
        `;
    }

    const template = `
        <div class="comentario-container">
            <div class="comentario-box">
                <p class="comentario-header"><strong>${comentario.usuario}</strong> (${comentario.fecha})</p>
                <p class="comentario-text">${comentario.texto}</p>
                <div class="ratings-container">
                    ${estrellasHTML}
                </div>
            </div>
        </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = template;
    contenedor.appendChild(div);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    seccioncomentarios();
    comentarios();
});