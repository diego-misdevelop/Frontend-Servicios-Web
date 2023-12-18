document.addEventListener("DOMContentLoaded", function() {
    var changePasswordBtn = document.getElementById('changePasswordBtn');
    var form = document.querySelector('.form');

    form.addEventListener('submit', function(event) {
        var volverButtonValue = "Volver";
        var submitButton = document.activeElement; // Botón presionado

        if (submitButton && submitButton.value === volverButtonValue) {
            event.preventDefault(); // Evitar el envío del formulario

            goBack(); // Llama a la función goBack() para volver
        }
    });
    function goBack() {
        window.location.href = '../hmtl/paginaPrincipal.html';
   }
    // Manejar clic en "Cambiar contraseña"
    changePasswordBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        var selectedUserId = document.getElementById('userSelection').value;
        var newPassword = document.getElementById('newPassword').value;

        // Aquí deberías enviar una solicitud al servidor para cambiar la contraseña del usuario seleccionado
        cambiarContrasenaRolSeguridad(selectedUserId, newPassword);
    });
});

function cambiarContrasenaRolSeguridad(userId, newPassword) {
    // Enviar una solicitud al servidor para cambiar la contraseña del usuario con el ID userId al nuevo newPassword
    // Puedes usar fetch o alguna librería para manejar peticiones HTTP
    // Ejemplo:
    fetch(`https://localhost:7151/api/Usuarios?id=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cambiar la contraseña');
        }
        // Acciones adicionales después de cambiar la contraseña (si es necesario)
        // Por ejemplo, mostrar un mensaje de éxito o redirigir a otra página
    })
    .catch(error => {
        console.error('Error:', error);
        // Manejar el error, mostrar un mensaje al usuario indicando que hubo un problema al cambiar la contraseña
    });
}
