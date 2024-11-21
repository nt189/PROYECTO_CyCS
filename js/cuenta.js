function cerrarsession(){
    sessionStorage.removeItem('id')
    window.location.href = "Index.html"
}
function cargadedatos(){
    var id = sessionStorage.getItem('id')
    var Usuarios = JSON.parse(localStorage.getItem('Usuarios'));

    var template = `
        <span id="Nombre"><b>Nombre:</b> ${Usuarios[id][0]+ ' ' + Usuarios[id][1]}</span><br>
        <span id="Matricula"><b>Matricula:</b> ${Usuarios[id][2]}</span><br>
        <span id="Facultad"><b>Facultad:</b> ${Usuarios[id][5]}</span><br>
    `
    document.getElementById('informacion').innerHTML = template
}
cargadedatos()