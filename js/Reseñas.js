document.addEventListener("DOMContentLoaded", function() {
    const reviewButtons = document.querySelectorAll(".review-btn");

    reviewButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Obtiene el contenedor de reseñas asociado al botón
            const reviewSection = button.nextElementSibling;

            // Alterna la visibilidad del contenedor de reseñas específico
            if (reviewSection.style.display === "none" || reviewSection.style.display === "") {
                reviewSection.style.display = "block";
            } else {
                reviewSection.style.display = "none";
            }
        });
    });
});
