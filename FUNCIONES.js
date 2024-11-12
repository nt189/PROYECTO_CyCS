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
        this.restaurantService = new RestaurantService();
        this.initEventListeners();
    }

    initEventListeners() {
        const searchInput = document.querySelector('#search-input');
        const filterButtons = document.querySelectorAll('.filter-btn');

        searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilter(e));
        });
    }

    async handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        const restaurants = await this.restaurantService.getAllRestaurants();
        
        const filteredRestaurants = restaurants.filter(restaurant => 
            restaurant.name.toLowerCase().includes(searchTerm) ||
            restaurant.foodType.some(type => type.toLowerCase().includes(searchTerm))
        );

        this.updateResults(filteredRestaurants);
    }

    async handleFilter(event) {
        const filterType = event.target.dataset.filter;
        const restaurants = await this.restaurantService.getAllRestaurants();
        
        let filteredRestaurants = restaurants;
        
        switch(filterType) {
            case 'economic':
                filteredRestaurants = restaurants.filter(r => r.priceRange.max <= 80);
                break;
            case 'healthy':
                filteredRestaurants = restaurants.filter(r => 
                    r.foodType.includes('Saludable') || r.foodType.includes('Vegetariano')
                );
                break;
            case 'nearby':
                filteredRestaurants = await this.getNearbyRestaurants(restaurants);
                break;
        }

        this.updateResults(filteredRestaurants);
    }

    async getNearbyRestaurants(restaurants, maxDistance = 1000) {
        if (!navigator.geolocation) return restaurants;

        try {
            const position = await this.getCurrentPosition();
            const userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            return restaurants.filter(restaurant => {
                const restaurantLocation = new google.maps.LatLng(
                    restaurant.location.coordinates[0],
                    restaurant.location.coordinates[1]
                );
                const distance = google.maps.geometry.spherical.computeDistanceBetween(
                    userLocation,
                    restaurantLocation
                );
                return distance <= maxDistance;
            });
        } catch (error) {
            console.error('Error getting nearby restaurants:', error);
            return restaurants;
        }
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    updateResults(restaurants) {
        // Actualizar marcadores en el mapa
        this.mapController.showRestaurantsOnMap(restaurants);
        
        // Actualizar lista de restaurantes
        const restaurantsGrid = document.querySelector('.restaurants-grid');
        restaurantsGrid.innerHTML = restaurants.map(restaurant => this.createRestaurantCard(restaurant)).join('');
    }

    createRestaurantCard(restaurant) {
        return `
            <article class="restaurant-card">
                <div class="restaurant-image">
                    <img src="${restaurant.image || '/api/placeholder/300/200'}" alt="${restaurant.name}">
                </div>
                <div class="restaurant-info">
                    <h3 class="restaurant-title">${restaurant.name}</h3>
                    <div class="rating">
                        ${this.createRatingStars(restaurant.rating)}
                        <span>(${restaurant.ratings.length} reseñas)</span>
                    </div>
                    <div class="restaurant-details">
                        <p><i class="fas fa-map-marker-alt"></i> ${restaurant.address}</p>
                        <p><i class="far fa-clock"></i> ${restaurant.schedule.opening} - ${restaurant.schedule.closing}</p>
                    </div>
                    <div class="price-range">
                        <span>$${restaurant.priceRange.min} - $${restaurant.priceRange.max}</span>
                    </div>
                </div>
            </article>
        `;
    }

    createRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
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