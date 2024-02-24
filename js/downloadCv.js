document.addEventListener("DOMContentLoaded", function () {
    // Obtén el elemento del botón de descarga
    var descargarCVButton = document.getElementById('descargarCV');

    // Agrega un evento click al botón
    descargarCVButton.addEventListener('click', function (event) {
        // Evita el comportamiento predeterminado del enlace
        event.preventDefault();

        // URL de tu archivo PDF (reemplaza con tu ruta)
        var cvURL = 'cv/CV-Eber-Garcia-Quality-Engineer.pdf';

        // Abrir el archivo en una nueva pestaña
        window.open(cvURL, '_blank');
    });
});
