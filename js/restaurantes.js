//Aquí tenemos que poner los datos de todos los restaurantes :3
let restaurantes = [
    {"id": 1, "nombre": "Antojitos Vickys", "tipo":"Antojitos Mexicanos", pagina: "Vicky.html"},
    {"id": 2, "nombre": "Frullatti", "tipo":"Tacos", pagina: "Frullatti.html"},
    {"id": 3, "nombre": "Burguerman", "tipo":"Comida Rapida" , pagina: "burguerman.html"},
    {"id": 4, "nombre": "Frutas", "tipo":"Comida Rapida" , pagina: "pruebas.html"}
     
];

// function buscarRestaurante() {
//     const termino = document.getElementById("buscador").value.toLowerCase();
//     const resultados = document.getElementById("resultados");
//     resultados.innerHTML = '';

//     // Filtrar restaurantes
//     const coincidencias = restaurantes.filter(restaurante =>
//         restaurante.nombre.toLowerCase().includes(termino) ||
//         restaurante.tipo.toLowerCase().includes(termino)
//     );

//     // Mostrar resultados con enlaces a la página restaurantes.html con ancla
//     if (coincidencias.length > 0) {
//         coincidencias.forEach(restaurante => {
//             const li = document.createElement("li");

//             // Crear enlace que redirige a restaurantes.html con ancla al restaurante
//             const enlace = document.createElement("a");
//             enlace.href = `restaurantes.html#restaurante-${restaurante.id}`;
//             enlace.textContent = `${restaurante.nombre} - ${restaurante.ubicacion} (${restaurante.tipo})`;
            
//             li.appendChild(enlace);
//             resultados.appendChild(li);
//         });
//     } else {
//         const li = document.createElement("li");
//         li.textContent = "No se encontraron resultados.";
//         resultados.appendChild(li);
//     }
// }