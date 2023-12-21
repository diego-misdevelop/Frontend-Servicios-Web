document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('.form'); // Selecciona el formulario por su ID
         
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var volverButtonValue = "Volver";
        var submitButton = document.activeElement; // Botón presionado

        if (submitButton && submitButton.value === volverButtonValue) {
            event.preventDefault(); // Evitar el envío del formulario
            goBack(); // Llama a la función goBack() para volver
        }

        if (submitButton && submitButton.value === volverButtonValue) {
            event.preventDefault();
            goBack();
        } else if (submitButton && submitButton.value === aceptarButtonValue){
            event.preventDefault();
            enviarDatos();
            alert("País agregado.")
        }

        
    });
    
});
function goBack() {
    window.location.href = '../html/verPaises.html';
}

function enviarDatos() {
        
    // Obtener los valores de los campos del formulario
       var nombrePais = document.querySelector('#nombrePais').value;
        
       // Crear un objeto con los datos a enviar
       var data={
           "id_pais": `${crypto.randomUUID()}`,
           "nom_pais": nombrePais,
           "bandera_pais": ""
       };

       fetch('https://localhost:7151/api/Pais', {
           method: 'POST', 
           headers: {
               'Content-Type': 'application/json' 
           },
           body: JSON.stringify(data) 
       })
       .then(response => {
           if (!response.ok) {
               throw new Error('Problema al registrar país.');
           }
           return response.json();
       })
       .then(result => {

           console.log('País registrado:', result);
           alert("Consecutivo agregado.")
       })
       .catch(error => {
           console.error('Error:', error);
       });

    }