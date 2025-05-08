var id = sessionStorage.getItem('id');

function Header() {
    let template;
    console.log(Boolean(id))
    if(id){
        template = `
           <nav class="navbar navbar-expand-lg navbar-dark py-2" style="background-color: #003b5c;">
    <div class="container-fluid">
        <!-- Logo y nombre (izquierda) -->
        <div class="d-flex align-items-center">
            <i class="fas fa-utensils fa-lg me-2 text-white"></i>
            <span class="navbar-brand mb-0 h1 fw-bold text-white">Lobo Croquetas</span>
        </div>

        <!-- Texto BUAP (centrado en desktop) -->
        <div class="d-none d-lg-flex mx-auto">
            <span class="fw-bold fs-3 text-white">BUAP</span>
        </div>

        <!-- Botón para móviles -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Contenido colapsable -->
        <div class="collapse navbar-collapse" id="navbarContent">
            <!-- BUAP centrado en móvil -->
            <div class="d-lg-none text-center my-3 w-100">
                <span class="fw-bold fs-3 d-block text-white">BUAP</span>
            </div>

            <!-- Menú de navegación (derecha) -->
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link text-white" href="Index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="Index.html#map">Mapa</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="Index.html#restaurantes">Restaurantes</a>
                </li>
                
                <!-- Separador solo en desktop -->
                <li class="nav-item d-none d-lg-flex align-items-center px-2">
                    <div style="width: 1px; height: 24px; background-color: rgba(255,255,255,0.5);"></div>
                </li>
                
                <!-- Opción de cuenta (adaptada) -->
                <li class="nav-item">
                    <a class="nav-link text-white d-flex align-items-center" href="cuenta.html">
                        <i class="fa-solid fa-user me-2 d-lg-none"></i>
                        <span>Cuenta</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
        `;
        console.log('usuario iniciado');
    }
    else{
        template = `
            <nav class="navbar navbar-expand-lg navbar-dark py-2" style="background-color: #003b5c;">
    <div class="container-fluid">
        <!-- Logo y nombre (izquierda) -->
        <div class="d-flex align-items-center">
            <i class="fas fa-utensils fa-lg me-2 text-white"></i>
            <span class="navbar-brand mb-0 h1 fw-bold text-white">Lobo Croquetas</span>
        </div>

        <!-- Texto BUAP (centrado en desktop) -->
        <div class="d-none d-lg-flex mx-auto">
            <span class="fw-bold fs-3 text-white">BUAP</span>
        </div>

        <!-- Botón para móviles -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Contenido colapsable -->
        <div class="collapse navbar-collapse" id="navbarContent">
            <!-- BUAP centrado en móvil -->
            <div class="d-lg-none text-center my-3 w-100">
                <span class="fw-bold fs-3 d-block text-white">BUAP</span>
            </div>

            <!-- Menú de navegación (derecha) -->
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link text-white" href="Index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="Index.html#map">Mapa</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="Index.html#restaurantes">Restaurantes</a>
                </li>
                
                <!-- Separador solo en desktop -->
                <li class="nav-item d-none d-lg-flex align-items-center px-2">
                    <div style="width: 1px; height: 24px; background-color: rgba(255,255,255,0.5);"></div>
                </li>
                
                <!-- Opciones de sesión -->
                <li class="nav-item">
                    <a class="nav-link text-white" href="Login.html">Iniciar Sesión</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="SignIn.html">Registrarse</a>
                </li>
            </ul>
        </div>
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