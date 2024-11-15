document.addEventListener("DOMContentLoaded", function() {
    const reviewButtons = document.querySelectorAll(".review-btn");

    reviewButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Obtiene el contenedor de reseñas asociado al botón
            const reviewSection = button.nextElementSibling;

            // Alterna la visibilidad del contenedor de reseñas específico
            if (reviewSection.style.display === "none" || reviewSection.style.display === "") {
                reviewSection.style.display = "block";
                reviewSection.classList.add("fade-in"); // Añade la clase de animación
            } else {
                reviewSection.style.display = "none";
                reviewSection.classList.remove("fade-in"); // Quita la clase de animación si se oculta
            }
        });
    });
});
