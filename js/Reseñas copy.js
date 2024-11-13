let currentCard = 0; // El índice de la tarjeta actual
const cards = document.querySelectorAll('.restaurant-card');
const totalCards = cards.length;

// Función para mostrar la tarjeta actual
function showCard(index) {
    cards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
    });
}

// Mostrar la primera tarjeta al inicio
showCard(currentCard);

// Funciones para navegar entre tarjetas
document.getElementById('prevBtn').addEventListener('click', () => {
    currentCard = (currentCard > 0) ? currentCard - 1 : totalCards - 1;
    showCard(currentCard);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentCard = (currentCard < totalCards - 1) ? currentCard + 1 : 0;
    showCard(currentCard);
});