function Registro2(a,b,c,d,e,f){//valida que todos los campos eten llenos
    if(a === '' || b === '' || c === '' || d === '' || e === '' || f === ''){
        alert("Por favor rellene correctamente todos los campos");
    }
    else{
        return 0;
    }
}

function Registro(){ 
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const matricula = document.getElementById('matricula').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;
    const facultad = document.getElementById('facultad').value;
    
    let Usuarios = JSON.parse(localStorage.getItem('Usuarios'));

    // alert(Usuarios);
    
    if(Usuarios === null && Registro2(nombre, apellidos, matricula, correo, contraseña, facultad) === 0){ //no hay usuarios
        var Usuariosaux = Array();
        Usuariosaux[0]=[nombre,apellidos,matricula,correo, contraseña,facultad];
        localStorage.setItem('Usuarios', JSON.stringify(Usuariosaux));
        // alert('Se a registrado a: ' + Usuarios[i][0]);
    }
    else if(Usuarios !== null && Registro2(nombre, apellidos, matricula, correo, contraseña, facultad) === 0){//hay mas de 1 ususario
        var aux; //no existe el usuario
        // alert(Usuarios[0][3] + ' ' + correo)
        for(var i=0; i<Usuarios.length ;i++){ //busca si ya existe al usuario
            if(Usuarios[i][3] === correo ){
                aux='Existe'; //encontro al usuario
            }
        }
        if(aux !== 'Existe'){ //el usuario no existe y lo va a crear
            Usuarios.push([nombre,apellidos,matricula,correo,contraseña,facultad]);
            localStorage.setItem('Usuarios', JSON.stringify(Usuarios));
            // alert('Se a registrado a: ' + Usuarios[i][4]);
            window.location.href = "Login.html"
        }
        else{
            // alert('Usuario ya registrado');
        }
    }
}