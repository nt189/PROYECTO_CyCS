// Obtener todos los botones de reseñas
const reviewBtns = document.querySelectorAll('.review-btn');

// Agregar un evento de clic a cada botón de reseñas
reviewBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    // Obtener la tarjeta de restaurante correspondiente
    const restaurantCard = document.querySelector(`#card${index + 1}`);
    
    // Seleccionar solo el contenido de reseñas de la tarjeta actual
    const reviewContent = restaurantCard.querySelector('.review-content');
    
    // Alternar la visualización del contenido de reseñas
    const isVisible = reviewContent.style.display === 'block';
    reviewContent.style.display = isVisible ? 'none' : 'block';

    // Ocultar el contenido de reseñas de las otras tarjetas
    reviewBtns.forEach((otherBtn, otherIndex) => {
      if (otherIndex !== index) {
        const otherCard = document.querySelector(`#card${otherIndex + 1}`);
        const otherReviewContent = otherCard.querySelector('.review-content');
        otherReviewContent.style.display = 'none';
      }
    });
  });
});
