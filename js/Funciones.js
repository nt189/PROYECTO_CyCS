// config.js
const config = {
    GOOGLE_MAPS_API_KEY: 'TU_API_KEY',
    API_BASE_URL: 'http://localhost:3000/api',
    DEFAULT_CENTER: {
        lat: 19.0055, // Coordenadas de CU BUAP
        lng: -98.2040
    }
}; 

// auth.js
class AuthService {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    async login(email, password) {
        try {
            const response = await fetch(`${config.API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) throw new Error('Error en la autenticación');

            const data = await response.json();
            this.setSession(data.token, data.user);
            return data;
        } catch (error) {
            console.error('Error de login:', error);
            throw error;
        }
    }

    setSession(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.token = token;
        this.user = user;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.token = null;
        this.user = null;
    }

    isAuthenticated() {
        return !!this.token;
    }
}

// restaurantService.js
class RestaurantService {
    constructor() {
        this.auth = new AuthService();
    }

    async getAllRestaurants() {
        try {
            const response = await fetch(`${config.API_BASE_URL}/restaurants`);
            return await response.json();
        } catch (error) {
            console.error('Error obteniendo restaurantes:', error);
            throw error;
        }
    }

    async addRestaurant(restaurantData) {
        try {
            const response = await fetch(`${config.API_BASE_URL}/restaurants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.auth.token}`
                },
                body: JSON.stringify(restaurantData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error añadiendo restaurante:', error);
            throw error;
        }
    }

    async addReview(restaurantId, review) {
        try {
            const response = await fetch(`${config.API_BASE_URL}/restaurants/${restaurantId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.auth.token}`
                },
                body: JSON.stringify(review)
            });
            return await response.json();
        } catch (error) {
            console.error('Error añadiendo reseña:', error);
            throw error;
        }
    }
}

// mapController.js
class MapController {
    constructor() {
        this.map = null;
        this.markers = [];
        this.restaurantService = new RestaurantService();
    }

    async initMap() {
        try {
            // Inicializar el mapa de Google
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: config.DEFAULT_CENTER,
                zoom: 15
            });

            // Cargar restaurantes y mostrar marcadores
            const restaurants = await this.restaurantService.getAllRestaurants();
            this.showRestaurantsOnMap(restaurants);

            // Agregar controles de ubicación
            this.addLocationControls();
        } catch (error) {
            console.error('Error inicializando mapa:', error);
        }
    }

    showRestaurantsOnMap(restaurants) {
        this.clearMarkers();
        
        restaurants.forEach(restaurant => {
            const marker = new google.maps.Marker({
                position: {
                    lat: restaurant.location.coordinates[0],
                    lng: restaurant.location.coordinates[1]
                },
                map: this.map,
                title: restaurant.name
            });

            const infoWindow = new google.maps.InfoWindow({
                content: this.createInfoWindowContent(restaurant)
            });

            marker.addListener('click', () => {
                infoWindow.open(this.map, marker);
            });

            this.markers.push(marker);
        });
    }

    createInfoWindowContent(restaurant) {
        return `
            <div class="info-window">
                <h3>${restaurant.name}</h3>
                <p>${restaurant.address}</p>
                <p>Horario: ${restaurant.schedule.opening} - ${restaurant.schedule.closing}</p>
                <p>Precio: $${restaurant.priceRange.min} - $${restaurant.priceRange.max}</p>
                <button onclick="showRestaurantDetails('${restaurant._id}')">Ver más</button>
            </div>
        `;
    }

    clearMarkers() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
    }

    addLocationControls() {
        const locationButton = document.createElement('button');
        locationButton.classList.add('custom-map-control');
        locationButton.innerHTML = '<i class="fas fa-location-arrow"></i>';
        
        this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);
        
        locationButton.addEventListener('click', () => {
            this.getCurrentLocation();
        });
    }

    async getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.map.setCenter(pos);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Error al obtener tu ubicación');
                }
            );
        }
    }
}

// searchController.js
class SearchController {
    constructor(mapController) {
        this.mapController = mapController;
        this.initEventListeners();
    }

    initEventListeners() {
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(this.buscarRestaurante.bind(this), 300));
        }
    }

    buscarRestaurante() {
        const termino = document.getElementById("search-input").value.toLowerCase();
        const resultados = document.getElementById("resultados");
        
        // Limpiar los resultados en cada búsqueda
        resultados.innerHTML = '';
    
        // Si el término está vacío, salir de la función para que no queden resultados
        if (!termino) return;
    
        // Filtrar restaurantes
        const coincidencias = restaurantes.filter(restaurante =>
            restaurante.nombre.toLowerCase().includes(termino) ||
            restaurante.tipo.toLowerCase().includes(termino)
        );
    
        // Mostrar resultados con enlaces a la página específica de cada restaurante
        if (coincidencias.length > 0) {
            coincidencias.forEach(restaurante => {
                const li = document.createElement("li");
                const enlace = document.createElement("a");
                enlace.href = `${restaurante.pagina}#restaurante-${restaurante.id}`;
                enlace.textContent = `${restaurante.nombre} - ${restaurante.tipo}`;
                li.appendChild(enlace);
                resultados.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "No se encontraron resultados.";
            li.classList.add("no-results"); // Clase opcional para estilo personalizado
            resultados.appendChild(li);
        }
    }
    

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// main.js
document.addEventListener('DOMContentLoaded', async () => {
    const auth = new AuthService();
    const mapController = new MapController();
    const searchController = new SearchController(mapController);

    // Inicializar mapa
    await mapController.initMap();

    // Manejar formulario de login
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const email = loginForm.querySelector('#email').value;
                const password = loginForm.querySelector('#password').value;
                await auth.login(email, password);
                window.location.reload();
            } catch (error) {
                alert('Error en el inicio de sesión');
            }
        });
    }

    // Manejar formulario de registro de restaurante
    const restaurantForm = document.querySelector('#restaurant-form');
    if (restaurantForm) {
        restaurantForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!auth.isAuthenticated()) {
                alert('Debes iniciar sesión para registrar un restaurante');
                return;
            }
            
            try {
                const formData = new FormData(restaurantForm);
                const restaurantData = Object.fromEntries(formData.entries());
                const restaurantService = new RestaurantService();
                await restaurantService.addRestaurant(restaurantData);
                alert('Restaurante registrado exitosamente');
                window.location.reload();
            } catch (error) {
                alert('Error al registrar el restaurante');
            }
        });
    }
});

/***** */

document.addEventListener('DOMContentLoaded', function() {
    // Cierra todos los acordeones excepto el clickeado
    document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-bs-target');
            
            // Cierra todos los demás acordeones
            document.querySelectorAll('.collapse').forEach(collapse => {
                if (`#${collapse.id}` !== target) {
                    const bsCollapse = bootstrap.Collapse.getInstance(collapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });
    });
});