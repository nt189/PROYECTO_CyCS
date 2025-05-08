function iniciadorRestarantes(){
    if(!localStorage.getItem('Restaurante')){
        var Restaurantes = Array();

        Restaurante = {
            "Nombre": "Burguerman",
            "Imagen": "img/hamburguesas.jpg",
            "Descripcion": "Burguerman es el destino ideal para los amantes de las hamburguesas. Con un ambiente vibrante y acogedor, este restaurante se especializa en ofrecer hamburguesas gourmet hechas con ingredientes frescos y de alta calidad. Cada bocado es una explosión de sabor, con opciones que van desde las clásicas hasta combinaciones innovadoras que sorprenderán a tu paladar. ",
            "Dirección": "",
            "Lunes": "10:00 - 22:00",
            "Martes": "10:00 - 22:00",
            "Miércoles": "10:00 - 22:00",
            "Jueves": "10:00 - 22:00",
            "Viernes": "10:00 - 22:00",
            "Sábado": "10:00 - 22:00",
            "Domingo": "10:00 - 22:00",
            "Oferta ecologica": "15% de desuento por llevar tu envase",
            "Oferta porDia": "10% los lunes, 20% los martes",
            "Oferta porHora": "20% de descuento de 10:00 a 12:00",
            "Oferta estudiantes": "No disponible",
        };
        Restaurantes.push(Restaurante);

        Restaurante = {
            "Nombre": "Frullatti",
            "Imagen": "img/tacos-placeros.jpg",
            "Descripcion": "Frullatti es un buffet que celebra la rica tradición gastronómica de los tacos. En este acogedor lugar, podrás disfrutar de una increíble variedad de tacos al pastor, tacos árabes y hot dogs, todos preparados al momento con los mejores ingredientes. La calidad de la carne y la frescura de los toppings hacen que cada taco sea una delicia.",
            "Dirección": "",
            "Lunes": "10:00 - 22:00",
            "Martes": "10:00 - 22:00",
            "Miércoles": "10:00 - 22:00",
            "Jueves": "10:00 - 22:00",
            "Viernes": "10:00 - 22:00",
            "Sábado": "10:00 - 22:00",
            "Domingo": "10:00 - 22:00",
            "Oferta ecologica": "15% de desuento por llevar tu envase",
            "Oferta porDia": "No disponible",
            "Oferta porHora": "No disponible",
            "Oferta estudiantes": "No disponible",
        };
        Restaurantes.push(Restaurante);

        Restaurante = {
            "Nombre": "Vicky's",
            "Imagen": "img/vockys.jpg",
            "Descripcion": "Antojitos Vickys es un lugar acogedor donde podrás disfrutar de una variedad de deliciosos antojitos típicos. Con un ambiente familiar y un servicio excepcional, es el lugar perfecto para disfrutar de una buena comida con amigos y seres queridos.",
            "Dirección": "",
            "Lunes": "10:00 - 22:00",
            "Martes": "10:00 - 22:00",
            "Miércoles": "10:00 - 22:00",
            "Jueves": "10:00 - 22:00",
            "Viernes": "10:00 - 22:00",
            "Sábado": "10:00 - 22:00",
            "Domingo": "10:00 - 22:00",
            "Oferta ecologica": "15% de desuento por llevar tu envase",
            "Oferta porDia": "10% los Viernes, 20% los Domingos",
            "Oferta porHora": "No disponible",
            "Oferta estudiantes": "No disponible",
        };
        Restaurantes.push(Restaurante);
        
        localStorage.setItem('Restaurantes', JSON.stringify(Restaurantes));
    }
    else{

    }
    // console.log(Restaurantes);
}
iniciadorRestarantes();