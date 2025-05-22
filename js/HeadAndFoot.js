var id = sessionStorage.getItem('id');

function Header() {
    let template;
    console.log(Boolean(id))
    if(id){
        template = `
            <nav>
                <div class="logo">
                    <i class="fas fa-utensils"></i>
                    <span>Lobo Croquetas</span>
                </div>
                <div>
                    <center><b style="color: #ffffff; font-size: 32px;">BUAP</b></center>
                </div>
                <div class="menu-toggle" onclick="toggleMenu()">☰</div>
                <div class="nav-links">
                    <a href="Index.html">Inicio</a>
                    <a href="Index.html#map">Mapa</a>
                    <a href="Index.html#restaurantes">Restaurantes</a>
                    <a id="session" href="cuenta.html">
                        <p>Cuenta <i class="fa-solid fa-user icono-usuario"></i></p>
                    </a>
                </div>
            </nav>
        `;
        console.log('usuario iniciado');
    }
    else{
        template = `
            <nav class="nav-nli">
                <div class="logo">
                    <i class="fas fa-utensils"></i>
                    <span>Lobo Croquetas</span>
                </div>
                <div class="title">
                    <center><b style="color: #ffffff; font-size: 32px;">BUAP</b></center>
                </div>
                <div class="menu-toggle" onclick="toggleMenu()">☰</div>
                <div class="nav-links">
                    <a href="Index.html">Inicio</a>
                    <a href="Index.html#map">Mapa</a>
                    <a href="Index.html#restaurantes">Restaurantes</a> 
                    <a href="Login.html">Iniciar Sesión</a>
                    <a href="SignIn.html">Registrarse</a>
                </div>
            </nav>
        `;
        console.log('usuario no iniciado');
    }
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
    console.log('footer')
}

Header();
Footer();

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }
});
