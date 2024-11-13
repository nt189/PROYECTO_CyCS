function iniciador(){
    if(!localStorage.getItem('Restaurante')){
        var Restaurantes = Array();

        var Restaurante = {
            "Nombre": "Burguerman",
            "Imagen": "img/hamburguesas.jpg",
            "Descripcion": "Burguerman es el destino ideal para los amantes de las hamburguesas. Con un ambiente vibrante y acogedor, este restaurante se especializa en ofrecer hamburguesas gourmet hechas con ingredientes frescos y de alta calidad. Cada bocado es una explosión de sabor, con opciones que van desde las clásicas hasta combinaciones innovadoras que sorprenderán a tu paladar. ",
            "Dirección": ""
        };
        Restaurantes.push(Restaurante);

        Restaurante = {
            "Nombre": "Frullatti",
            "Imagen": "img/tacos-placeros.jpg",
            "Descripcion": "Frullatti es un buffet que celebra la rica tradición gastronómica de los tacos. En este acogedor lugar, podrás disfrutar de una increíble variedad de tacos al pastor, tacos árabes y hot dogs, todos preparados al momento con los mejores ingredientes. La calidad de la carne y la frescura de los toppings hacen que cada taco sea una delicia.",
            "Dirección": ""
        };
        Restaurantes.push(Restaurante);

        Restaurante = {
            "Nombre": "Vicky's",
            "Imagen": "img/vockys.jpg",
            "Descripcion": "Antojitos Vickys es un lugar acogedor donde podrás disfrutar de una variedad de deliciosos antojitos típicos. Con un ambiente familiar y un servicio excepcional, es el lugar perfecto para disfrutar de una buena comida con amigos y seres queridos.",
            "Dirección": ""
        };
        Restaurantes.push(Restaurante);
        
        localStorage.setItem('Restaurantes', JSON.stringify(Restaurantes));
    }
    else{

    }
    console.log(Restaurantes);
}

function comentarios(){
    var Restaurantes = JSON.parse(localStorage.getItem('Restaurantes'));
    var idr;
    
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
}
comentarios();
iniciador();