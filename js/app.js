// Event listeners para validar campos al salir del input
document.getElementById('to_name').addEventListener('blur', validarCampo);
document.getElementById('from_name').addEventListener('blur', validarCampo);
document.getElementById('message').addEventListener('blur', validarCampo);

// Función para validar campos al salir del input
function validarCampo(event) {
    var campo = event.target;
    var valor = campo.value.trim();

    if (!valor) {
        mostrarAlerta('Por favor, completa todos los campos antes de enviar el correo.', 'red');
    } else if (campo.id === 'from_name' && !validarFormatoCorreo(valor)) {
        mostrarAlerta('Por favor, ingresa una dirección de correo electrónico válida.', 'red');
    } else {
        ocultarAlerta();
    }
}

// Función para mostrar alertas
function mostrarAlerta(mensaje, color) {
    var alertBox = document.getElementById('alertBox');
    alertBox.textContent = mensaje;
    alertBox.style.display = 'block';
    alertBox.style.backgroundColor = color;
    alertBox.style.color = 'white';
}

// Función principal para enviar el correo
function enviarCorreo() {
    var campos = ['to_name', 'from_name', 'message'];

    for (var i = 0; i < campos.length; i++) {
        var valor = obtenerValorCampo(campos[i]);

        if (!valor) {
            mostrarAlerta('Por favor, completa todos los campos antes de enviar el correo.', 'red');
            return false;
        } else if (campos[i] === 'from_name' && !validarFormatoCorreo(valor)) {
            mostrarAlerta('Por favor, ingresa una dirección de correo electrónico válida.', 'red');
            return false;
        }
    }

    // Configurar datos para la solicitud
    var data = {
        service_id: 'service_exa54zs',
        template_id: 'template_puyi88o',
        user_id: 'L81M-TljgbnvunSlp',
        template_params: {
            'to_name': obtenerValorCampo('to_name'),
            'from_name': obtenerValorCampo('from_name'),
            'message': obtenerValorCampo('message')
        }
    };

    // Configurar solicitud
    var opcionesSolicitud = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // URL de la API de Email.js
    var apiURL = 'https://api.emailjs.com/api/v1.0/email/send';

    // Realizar solicitud a la API de terceros
    enviarSolicitudAPI(apiURL, opcionesSolicitud)
        .then(function (data) {
            console.log('Correo enviado con éxito. Detalles:', data);
            mostrarAlerta('Correo enviado con éxito', 'green');
        })
        .catch(function (error) {
            console.error('Error al enviar el correo:', error);
            mostrarAlerta('Error al enviar el correo. Por favor, inténtalo de nuevo más tarde.', 'red');
        })
        .finally(function () {
            // Esperar 5 segundos y luego ocultar la alerta y resetear el formulario
            setTimeout(function () {
                ocultarAlerta();
                resetearFormulario('contactForm');
            }, 5000);
        });

    // Evitar que el formulario se envíe automáticamente
    return false;
}

// Función para obtener el valor de un campo
function obtenerValorCampo(campoId) {
    return document.getElementById(campoId).value;
}

// Función para validar el formato de correo electrónico
function validarFormatoCorreo(correo) {
    var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailFormat.test(correo);
}

// Función para enviar la solicitud a la API
function enviarSolicitudAPI(url, opciones) {
    return fetch(url, opciones)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error al enviar el correo');
            }
            return response.text();
        });
}

// Función para resetear el formulario
function resetearFormulario(formularioId) {
    document.getElementById(formularioId).reset();
}

// Función para ocultar la alerta
function ocultarAlerta() {
    var alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'none';
}
