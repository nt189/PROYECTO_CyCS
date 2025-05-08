/*CATEGORIAS DE CALIFICACIÓN*/
const categoriasNombres = {
    Calcom: "Calidad de Comida",
    SerCli: "Servicio al Cliente",
    CalPre: "Calidad-Precio",
    Amb: "Ambiente",
    Sos: "Sostenibilidad"
};

/*CREACIÓN DE ESTRELLAS DEL FORMULARIO*/
function crearEstrellas(clase, puntuacion = 0) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        const checked = i <= puntuacion ? 'checked' : '';
        html += `<i class="bi bi-star-fill star ${checked}" data-valor="${i}" data-cat="${clase}"></i>`;
    }
    return html;
}

/*Inicializar eventos de las estrellas*/
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

/*CARGAR COMENTARIOS ESPECIFICOS DEL RESTAURANTE*/
function comentarios() {
    if (sessionStorage.getItem('id')) {
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
            
            comentariosRestaurante.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).forEach(comentario => {
                    mostrarComentario(comentario);
                });

        } catch (error) {
            console.error('Error al cargar comentarios:', error);
        }
    }
}

/*REINICIO DE ESTRELLAS*/
function reiniciarEstrellas() {
    document.querySelectorAll('.star-container .star').forEach(star => {
        star.classList.remove('checked');
    });
}

/*MOSTRAR COMENTARIOS SI ESTA LOGUEADO*/
function seccioncomentarios() {
    if (sessionStorage.getItem('id')) {
        const idUsuario = sessionStorage.getItem('id');
        const idRestaurante = document.getElementById('restaurante-id').value;
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
        const comentariosRestaurante = comentarios[idRestaurante] || [];

        const nombreUsuario = JSON.parse(localStorage.getItem('Usuarios'))[idUsuario][0];
        const comentarioExistente = comentariosRestaurante.find(c => c.usuario === nombreUsuario);

        const textoComentario = comentarioExistente ? comentarioExistente.texto : '';  // Asegurando que textoComentario esté definido
        if (!comentarioExistente) {
            const div = document.createElement('div');
            div.id = 'formulario-registrar';
            div.innerHTML = `
                <div class="restaurant-detail-view">
                    <h3 class="rating-title">Calidad de Comida</h3>
                    <div class="Calcom star-container">
                        ${crearEstrellas('Calcom', comentarioExistente?.calificaciones?.Calcom)}
                    </div>
    
                    <h3 class="rating-title">Servicio al cliente</h3>
                    <div class="SerCli star-container">
                        ${crearEstrellas('SerCli', comentarioExistente?.calificaciones?.SerCli)}
                    </div>
    
                    <h3 class="rating-title">Calidad-Precio</h3>
                    <div class="CalPre star-container">
                        ${crearEstrellas('CalPre', comentarioExistente?.calificaciones?.CalPre)}
                    </div>
    
                    <h3 class="rating-title">Ambiente</h3>
                    <div class="Amb star-container">
                        ${crearEstrellas('Amb', comentarioExistente?.calificaciones?.Amb)}
                    </div>
    
                    <h3 class="rating-title">Sostenibilidad</h3>
                    <div class="Sos star-container">
                        ${crearEstrellas('Sos', comentarioExistente?.calificaciones?.Sos)}
                    </div>
    
                    <form>
                        <label for="comentario">Comentario:</label>
                        <textarea style="width: 100%; height: 100px; box-sizing: border-box;" id="comentario">${textoComentario}</textarea>
                        <input type="button" onclick="cargarcomentario()" value="${comentarioExistente ? 'Actualizar Comentario' : 'Agregar Comentario'}" id="review-btn-share" name="comentario">
                    </form>
                </div>
            `;
            document.getElementById('mainComentarios').appendChild(div);

        }
        inicializarEstrellas();
    }
}

/*FORMULARIO PARA ACTUALIZAR*/
function formulario_Actualizado(comentario) {
    document.querySelectorAll('.comentario-container').forEach(div => {
        div.style.display = 'none';
    });
    document.getElementById('mainComentarios').innerHTML = '';
    const div = document.createElement('div');
    div.id = 'formulario-edicion';
    div.innerHTML = `
        <div class="restaurant-detail-view" style="display: block;">
            <h3 class="rating-title">Calidad de Comida</h3>
            <div class="Calcom star-container">
                ${crearEstrellas('Calcom', comentario.calificaciones.Calcom)}
            </div>

            <h3 class="rating-title">Servicio al cliente</h3>
            <div class="SerCli star-container">
                ${crearEstrellas('SerCli', comentario.calificaciones.SerCli)}
            </div>

            <h3 class="rating-title">Calidad-Precio</h3>
            <div class="CalPre star-container">
                ${crearEstrellas('CalPre', comentario.calificaciones.CalPre)}
            </div>

            <h3 class="rating-title">Ambiente</h3>
            <div class="Amb star-container">
                ${crearEstrellas('Amb', comentario.calificaciones.Amb)}
            </div>

            <h3 class="rating-title">Sostenibilidad</h3>
            <div class="Sos star-container">
                ${crearEstrellas('Sos', comentario.calificaciones.Sos)}
            </div>

            <form>
                <label for="comentario">Comentario:</label>
                <textarea style="width: 100%; height: 100px; box-sizing: border-box;" id="comentario">${comentario.texto}</textarea>
                <input type="button" onclick="cargarcomentario()" value="Actualizar Comentario" id="review-btn-share" name="comentario">
            </form>
        </div>
    `;
    document.getElementById('mainComentarios').appendChild(div);
    inicializarEstrellas();
    
}

/*GUARDAR EL COMENTARIO*/
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
            fecha: new Date().toISOString()
        };

        // Guardar en localStorage
        let todosComentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
        
        if (!todosComentarios[idRestaurante]) {
            todosComentarios[idRestaurante] = [];
        }

        // Actualiza el comentario
        const comentariosRestaurante = todosComentarios[idRestaurante];
        const indexExistente = comentariosRestaurante.findIndex(c => c.usuario === usr[idUsuario][0]);
        if (indexExistente !== -1) {
            comentariosRestaurante[indexExistente] = nuevoComentario;
        } else {
            comentariosRestaurante.push(nuevoComentario);
        }
        localStorage.setItem('comentarios', JSON.stringify(todosComentarios));

        // Mostrar el nuevo comentario
        document.querySelector('.user-reviews').innerHTML = '<h3>Reseñas de usuarios:</h3>';
        comentarios();

        // Limpiar el textarea y las estrellas
        document.getElementById('comentario').value = '';
        reiniciarEstrellas();

        const ComentarioRegistrado = document.getElementById('formulario-registrar');
        if (ComentarioRegistrado) {
            ComentarioRegistrado.remove();
        }

        // Ocultar el formulario de actualizar el comentario
        const ComentarioActualizado = document.getElementById('formulario-edicion');
        if (ComentarioActualizado) {
            ComentarioActualizado.style.display = 'none';
        }

        console.log('Datos guardados:', JSON.parse(localStorage.getItem('comentarios')));
        const formAgregar = document.getElementById('formulario-registrar');
        if (formAgregar) {
            formAgregar.remove();
        }
        const formEdicion = document.getElementById('formulario-edicion');
        if (formEdicion) {
            formEdicion.remove();
        }
    } catch (error) {
        console.error('Error al guardar comentario:', error);
        alert('Ocurrió un error al guardar el comentario');
    }
}

/*MUESTRA EL COMENTARIO*/
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

    const idUsuario = sessionStorage.getItem('id');
    const usr = JSON.parse(localStorage.getItem('Usuarios')) || {};
    const nombreUsuario = usr[idUsuario]?.[0];

    const esComentarioDelUsuario = comentario.usuario === nombreUsuario;

    const div = document.createElement('div');
    div.classList.add('comentario-container');

    let template = `
        <div class="comentario-box">
            <p class="comentario-header"><strong>${comentario.usuario}</strong> (${new Date(comentario.fecha).toLocaleString()})</p>
            <p class="comentario-text">${comentario.texto}</p>
            <div class="ratings-container">
                ${estrellasHTML} 
            </div>
    `;
    if (esComentarioDelUsuario) {
        template += `
            <button class="btn" style="color: white; background-color: #003b5c; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;" onmouseover="this.style.backgroundColor='#005f8a'" onmouseout="this.style.backgroundColor='#003b5c'">Editar</button>

        `;
    }
    template += `</div>`;
    div.innerHTML = template;
    if (esComentarioDelUsuario) {
        const btn = div.querySelector('button');
        btn.addEventListener('click', () => formulario_Actualizado(comentario));
    }

    contenedor.appendChild(div);
}

/*INICIALIZAR LA PAGINA AL CARGAR*/
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('id')) {
        const reseñas = document.querySelector('.user-reviews');
        if (reseñas) reseñas.style.display = 'block';
    }
    seccioncomentarios();
    comentarios();
});
