document.addEventListener("DOMContentLoaded", function() {
    var changePasswordBtn = document.getElementById('changePasswordBtn');
    var form = document.querySelector('.form');

    form.addEventListener('submit', function(event) {
        var volverButtonValue = "Volver";
        var submitButton = document.activeElement; // Botón presionado

        // Obtener los valores de los campos del formulario
        var contrasenia = document.querySelector('#contrasenia').value;
        var nueva_contra = document.querySelector('#nueva_contra').value;
        var conf_contrasenia = document.querySelector('#conf_contrasenia').value;

        // Crear un objeto con los datos a enviar
        var data={
            "correo_usuario": email,
            "contra_usuario": contrasenia
        };
        
        if (submitButton && submitButton.value === volverButtonValue) {
            event.preventDefault(); // Evitar el envío del formulario
            alert('Bton "Volver" presionado');
            goBack(); // Llama a la función goBack() para volver
        }
    });

    function goBack() {
        window.location.href = '../html/paginaPrincipal.html';
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

function obtenerUserId(){
    return localStorage.getItem('userId');
}

function cambiarContrasenaRolSeguridad(userId, contrasenia,newPassword) {
    fetch(`https://localhost:7151/api/Usuarios?id=${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contrasenia, newPassword })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cambiar la contraseña');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
