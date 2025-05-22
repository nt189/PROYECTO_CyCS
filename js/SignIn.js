function EsContrasenaSegura(contrasena) {
    const minLength = 8; // Longitud mínima
    const hasUppercase = /[A-Z]/.test(contrasena);
    const hasLowercase = /[a-z]/.test(contrasena);
    const hasNumbers = /[0-9]/.test(contrasena);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena);

    return contrasena.length >= minLength && hasUppercase && hasLowercase && hasNumbers && hasSpecialChars;
}

function VerificacionFormulario(a,b,c,d,e,f,g){//valida que todos los campos eten llenos
    if (a === '' || b === '' || c === '' || d === '' || e === '' || f === '' || g === '') {
        alert("Por favor rellene correctamente todos los campos");
        return 1; 
    } else if (e !== f) {
        alert('Las contraseñas no coinciden');
        return 2; 
    } else if (!EsContrasenaSegura(e)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.');
        return 3; 
    } else {
        return 0; // Todo bien
    }
}


//PRUEBA JEST "Comentar cuando no se ocupe"
//module.exports = VerificacionFormulario;

function Registro(){ 
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const matricula = document.getElementById('matricula').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;
    const contraseñav = document.getElementById('contraseñav').value;
    const facultad = document.getElementById('facultad').value;
    
    let Usuarios = JSON.parse(localStorage.getItem('Usuarios'));

    // alert(Usuarios);
    
    if(Usuarios === null && VerificacionFormulario(nombre, apellidos, matricula, correo, contraseña, contraseñav, facultad) === 0){ //no hay usuarios
        var Usuariosaux = Array();
        Usuariosaux[0]=[nombre,apellidos,matricula,correo, contraseña,facultad];
        localStorage.setItem('Usuarios', JSON.stringify(Usuariosaux));
        // alert('Se a registrado a: ' + Usuarios[i][0]);
        window.location.href = "Login.html"
    }
    else if(Usuarios !== null && VerificacionFormulario(nombre, apellidos, matricula, correo, contraseña, contraseñav, facultad) === 0){//hay mas de 1 ususario
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