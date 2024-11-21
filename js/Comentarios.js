function comentarios(){
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
comentarios();

function cargarcomentario(){
    var comentario = document.getElementById('comentario').value;

    Restaurante = {
        "id": sessionStorage.getItem('id'),
        "comentario": comentario,
    };

}
