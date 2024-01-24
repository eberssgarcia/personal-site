function enviarCorreo() {
    // Obtener los valores de los campos
    var to_name = document.getElementById('to_name').value;
    var from_name = document.getElementById('from_name').value;
    var message = document.getElementById('message').value;

    // Validar que los campos no estén vacíos
    if (!to_name || !from_name || !message) {
        alert('Por favor, completa todos los campos antes de enviar el correo.');
        return; // Detener la función si hay campos vacíos
    }

    // Validar formato del correo electrónico
    var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(from_name)) {
        alert('Por favor, ingresa una dirección de correo electrónico válida.');
        return; // Detener la función si el formato del correo electrónico no es válido
    }

    // Crear el objeto de datos para la solicitud
    var data = {
        service_id: 'service_exa54zs',
        template_id: 'template_puyi88o',
        user_id: 'L81M-TljgbnvunSlp',
        template_params: {
            'to_name': to_name,
            'from_name': from_name,
            'message': message
        }
    };

    // Configuración de la solicitud
    var opcionesSolicitud = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // Reemplazar con la URL de la API de Email.js
    var apiURL = 'https://api.emailjs.com/api/v1.0/email/send';

    // Realizar la solicitud a la API de terceros
    fetch(apiURL, opcionesSolicitud)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar el correo');
        }
        return response.text();
    })
    .then(data => {
        console.log('Correo enviado con éxito. Detalles:', data);
        mostrarAlerta('Correo enviado con éxito');

        // Esperar 5 segundos y luego ocultar la alerta y resetear el formulario
        setTimeout(function () {
            ocultarAlerta();
            document.getElementById('contactForm').reset();
        }, 5000);
    })
    .catch(error => {
        console.error('Error al enviar el correo:', error);
        mostrarAlerta('Error al enviar el correo. Por favor, inténtalo de nuevo más tarde.');
        // Ocultar la alerta después de 5 segundos
        setTimeout(function () {
            ocultarAlerta();
        }, 5000);
        document.getElementById('contactForm').reset();
    });
}

function mostrarAlerta(mensaje) {
    var alertBox = document.getElementById('alertBox');
    alertBox.textContent = mensaje;
    alertBox.style.display = 'block';
}

function ocultarAlerta() {
    var alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'none';
}
