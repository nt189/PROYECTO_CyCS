function Header() {
    let template = `
        <nav>
            <div class="logo">
                <i class="fas fa-utensils"></i>
                Lobo Croquetas
            </div>
            <div class="nav-links">
                <a href="#inicio">Inicio</a>
                <a href="#mapa">Mapa</a>
                <a href="#restaurantes">Restaurantes</a>
                <div class="session">
                    <img src="" alt="Usuario" />
                    <a href="Iniciousr.html">Iniciar Sesión</a>
                    <a href="Registrousr.html">Registrarse</a>
                </div>
            </div>
        </nav>
    `;
    document.getElementById('header').innerHTML = template;
    console.log('header')
}

function Footer(){
    let template = `
    
    `;
}