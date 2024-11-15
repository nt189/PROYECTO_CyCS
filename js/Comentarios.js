function comentarios(){
    var Restaurantes = JSON.parse(localStorage.getItem('Restaurantes'));
    var idr;
    console.log(Restaurantes)

    var template=`
      <center><h1>${Restaurantes[0].Nombre}</h1></center>

        <section class="restaurant-detail-view">
            <article>
                <div class="restaurant-photo">
                    <img src="${Restaurantes[0].Imagen}" alt="hamburguesas">
                </div>

                <div class="restaurant-description">
                    <h2 > ${Restaurantes[0].Descripcion} </h2>
                <p>

                </p>
                </div>

                <div class="user-reviews">
                    <h3>Reseñas de usuarios:</h3>
                    <div class="user-review">
                        <p><strong>Juan Pérez:</strong> Excelente comida y servicio. ¡Volveré pronto!</p>
                    </div>
                    <div class="user-review">
                        <p><strong>María López:</strong> Ambiente acogedor y precios razonables. Muy recomendable.</p>
                    </div>
                    <div class="user-review">
                        <p><strong>Carlos Ruiz:</strong> Los tacos son los mejores que he probado. ¡Deliciosos!</p>
                    </div>
                    <div class="user-review">
                        <p><strong>Santi esteban:</strong>En los tacos me salio un pelo ¡pesimo servicio!</p>
                    </div>
                </div>
            </article>
        </section>

    `;

    document.getElementById('mainComentarios').innerHTML = template;

    // console.log(Boolean(sessionStorage.getItem('id')))
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
