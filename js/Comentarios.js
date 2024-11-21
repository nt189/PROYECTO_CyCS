function seccioncomentarios(){
    if (sessionStorage.getItem('id')){
        var div = document.createElement('div');
        var comentario = `
            <div class="restaurant-detail-view">
                    <form>
                        <label for="comentario">Comentario:</label>
                        <textarea style="width: 100%; height: 100%; box-sizing: border-box; " id="comentario"></textarea>
                        <input type="button" onclick="cargarcomentario()" value="Compartir" id="review-btn-share" name="comentario">
                    </form>
                </div>
        `
        div.innerHTML = comentario
        // console.log('oashnahsbhgabsvgh')
        document.getElementById('mainComentarios').appendChild(div);
    }
}
seccioncomentarios();

function comentarios(){
    var comentarios = JSON.parse(localStorage.getItem('comentarios'));
    var usr = JSON.parse(localStorage.getItem('Usuarios'))
    
    for (let id = 0; id < comentarios.length; id++) {
        for (let com = 0; com < comentarios[id].length; com++) {
            var template = `
                <div>
                    <p><strong>${usr[id][0]}</strong>:${comentarios[id][com]}</p>
                </div>
            `

            var div = document.createElement('div');
            div.innerHTML = template;

            var reviewsContainer = document.getElementsByClassName('user-reviews')[0]; // Obtiene el primer elemento con la clase 'user-reviews'
            reviewsContainer.appendChild(div);
        }
    }
}
comentarios()

function cargarcomentario(){
    var id = sessionStorage.getItem('id');
    var comentario = document.getElementById('comentario').value;
    var usr = JSON.parse(localStorage.getItem('Usuarios'))

    if(localStorage.getItem('comentarios')){
        var comentarios = JSON.parse(localStorage.getItem('comentarios'));

        if (!comentarios[id]) {
            comentarios[id] = []; 
        }

        comentarios[id].push(comentario)
        localStorage.removeItem('comentarios')
        localStorage.setItem('comentarios',JSON.stringify(comentarios))
        console.log(comentarios)
    }
    else{
        var comaux = Array();
        comaux[id] = [];
        comaux[id].push(comentario)
        localStorage.setItem('comentarios',JSON.stringify(comaux))

        var template = `
                <div>
                    <p><strong>${usr[id][0]}</strong>:${comentarios[id][comentarios[id].length-1]}</p>
                </div>
            `

            var div = document.createElement('div');
            div.innerHTML = template;

            var reviewsContainer = document.getElementsByClassName('user-reviews')[0]; // Obtiene el primer elemento con la clase 'user-reviews'
            reviewsContainer.appendChild(div);
    }

    var template = `
                <div>
                    <p><strong>${usr[id][0]}</strong>:${comentarios[id][comentarios[id].length-1]}</p>
                </div>
            `

    var div = document.createElement('div');
    div.innerHTML = template;

    var reviewsContainer = document.getElementsByClassName('user-reviews')[0]; // Obtiene el primer elemento con la clase 'user-reviews'
    reviewsContainer.appendChild(div);
}
