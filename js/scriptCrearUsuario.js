document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('.form'); // Selecciona el formulario por su ID
   
    function goBack() {
        window.location.href = '../html/paginaPrincipal.html';
   }
      
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var volverButtonValue = "Volver";
        var submitButton = document.activeElement; // Botón presionado

        if (submitButton && submitButton.value === volverButtonValue) {
            event.preventDefault(); // Evitar el envío del formulario

            goBack(); // Llama a la función goBack() para volver
        }

     // Obtener los valores de los campos del formulario
        var usuario = document.querySelector('#usuario').value;
        var contrasenia = document.querySelector('#contrasenia').value;
        var email = document.querySelector('#email').value;
        var preg_seg = document.querySelector('#preg_seg').value;
        var conf_preg_seg = document.querySelector('#conf_preg_seg').value;
 
        // Crear un objeto con los datos a enviar
        var data={
            "id_usuario": `${Math.random()*10000000}`,
            "nom_usuario": usuario,
            "pri_apellido": "",
            "seg_apellido": "",
            "correo_usuario": email,
            "contra_usuario": contrasenia,
            "pregunta_seguridad": preg_seg,
            "respuesta_seguridad": conf_preg_seg,
            "id_rol": 1
        };


        // Enviar los datos a través de fetch
        fetch('https://localhost:7151/api/Usuarios', {
            method: 'POST', // Método POST para enviar datos
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json' // Tipo de contenido JSON
            },
            body: JSON.stringify(data) // Convertir datos a JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Problema al registrar usuario');
            }
            return response.json();
        })
        .then(result => {

            console.log('Usuario registrado:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
