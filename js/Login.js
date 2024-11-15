var id;

function Logueo(){
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;
    let Usuarios = JSON.parse(localStorage.getItem('Usuarios'));
    var aux=0;
    
    if(Usuarios === null){
        alert("Usuario inexistente");
    }
    else{
        for(var i=0; i<Usuarios.length ;i++){ //se busca al usuario
            if(correo === Usuarios[i][3]){
                aux=1;
                id=i;
                break;
            }
        }

        if(aux === 1 && contraseña === Usuarios[id][4]){
            alert("Inicio de sessión");
            sessionStorage.setItem('id',id);
            window.location.href = 'Index.html';
        }
        else{
            alert("Credenciales invalidas");
            event.preventDefault();
        }
    }
}