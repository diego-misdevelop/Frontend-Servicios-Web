document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('.form'); // Selecciona el formulario por su ID
   
    function goBack() {
        window.location.href = '../html/verConsecutivos.html';
   }
      
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var volverButtonValue = "Volver";
        var aceptarButtonValue = "Aceptar";
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
            alert("Consecutivo actualizado.")
        }

        
    });
    
});

function enviarDatos() {
        
    // Obtener los valores de los campos del formulario
       var descripción = document.querySelector('#descripción').value;
       var prefijo = document.querySelector('#prefijo').value;
       var rango_inicial = document.querySelector('#rango_inicial').value;
       var rango_final = document.querySelector('#rango_final').value;

       // Crear un objeto con los datos a enviar
       var data={
           "id_consecutivo": `${Math.random()*10000000}`,
           "descripcion_consecutivo": descripción,
           "prefijo_consecutivo": prefijo,
           "rango_Inicial": rango_inicial,
           "rango_Final": rango_final,
           "valor_consecutivo": 0
       };


       // Enviar los datos a través de fetch
       fetch('https://localhost:7151/api/Consecutivoes', {
           method: 'POST', // Método POST para enviar datos
           mode: 'cors',
           headers: {
               'Content-Type': 'application/json' // Tipo de contenido JSON
           },
           body: JSON.stringify(data) // Convertir datos a JSON
       })
       .then(response => {
           if (!response.ok) {
               throw new Error('Problema al registrar consecutivo.');
           }
           return response.json();
       })
       .then(result => {

           console.log('Consecutivo registrado:', result);
           alert("Consecutivo agregado.")
       })
       .catch(error => {
           console.error('Error:', error);
       });

    }