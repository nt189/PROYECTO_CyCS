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
                    <img src=""/>
                    <a href="Login.html">Iniciar Sesión</a>
                    <a href="SignIn .html">Registrarse</a>
                </div>
            </div>
        </nav>
    `;
    document.getElementById('header').innerHTML = template;
    console.log('header')
}

function Footer(){
    let template = `
        <div class="footer-content">
            <div class="footer-section">
                <h3>Sobre Nosotros</h3>
                <ul>
                    <li><a href="#">Quiénes somos</a></li>
                    <li><a href="#">Contacto</a></li>
                    <li><a href="#">Términos y condiciones</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Para Restaurantes</h3>
                <ul>
                    <li><a href="#">Registra tu negocio</a></li>
                    <li><a href="#">Centro de ayuda</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Síguenos</h3>
                <ul>
                    <li><a href="#"><i class="fab fa-facebook"></i> Facebook</a></li>
                    <li><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
                    <li><a href="#"><i class="fab fa-twitter"></i> Twitter</a></li>
                </ul>
            </div>
        </div>
    `;
    document.getElementById('footer').innerHTML = template;
    console.log('header')
}

Header();
Footer();