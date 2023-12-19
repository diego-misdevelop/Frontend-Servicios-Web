document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('.form');

    form.addEventListener('submit', function(event) {
        var volverButtonValue = "Volver";
        var submitButton = document.activeElement;

        if (submitButton && submitButton.value === volverButtonValue) {
            event.preventDefault();
            goBack();
        } else {
            event.preventDefault();
            enviarDatos();
        }
    });

    cargarConsecutivos();
    cargarDatosConsecutivo();
    enviarDatos();
});

function goBack() {
    window.location.href = '../html/verConsecutivos.html';
}

function cargarConsecutivos() {
    fetch('https://localhost:7151/api/Consecutivoes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Problema');
            }
            return response.json();
        })
        .then(consecutivos => {
            mostrarConsecutivos(consecutivos);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function mostrarConsecutivos(consecutivos) {
    var descripcionSelect = document.getElementById('descripcion');

    if (descripcionSelect) {
        consecutivos.forEach(consecutivo => {
            var option = document.createElement('option');
            option.value = consecutivo.descripcion_consecutivo;
            option.textContent = consecutivo.descripcion_consecutivo;
            descripcionSelect.appendChild(option);
        });
    } else {
        console.error('El select de descripción no se encontró en el DOM.');
    }
}

function cargarDatosConsecutivo() {
    // Obtener el ID del consecutivo de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idConsecutivo = urlParams.get('id');

    // Obtener datos del consecutivo específico y llenar los campos de edición
    fetch(`https://localhost:7151/api/Consecutivoes/${idConsecutivo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Problema');
            }
            return response.json();
        })
        .then(consecutivo => {
            document.getElementById('descripcion').value = consecutivo.descripcion_consecutivo;
            document.getElementById('consecutivo').value = consecutivo.valor_consecutivo;
            document.getElementById('prefijo').value = consecutivo.prefijo_consecutivo;
            document.getElementById('rango_inicial').value = consecutivo.rango_Inicial;
            document.getElementById('rango_final').value = consecutivo.rango_Final;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function enviarDatos() {

    var descripcion = document.querySelector('#descripcion').value;
    var prefijo = document.querySelector('#prefijo').value;
    var rangoInicial = document.querySelector('#rango_inicial').value;
    var rangoFinal = document.querySelector('#rango_final').value;
    const urlParams = new URLSearchParams(window.location.search);
    const idConsecutivo = urlParams.get('id');

    // Crear un objeto con los datos a enviar
    var data={
        "id_consecutivo": `${Math.random()*10000000}`,
        "descripcion_consecutivo": descripcion,
        "prefijo_consecutivo": prefijo,
        "rango_Inicial": rangoInicial,
        "rango_Final": rangoFinal,
        "valor_consecutivo": 1
    };

     fetch(`https://localhost:7151/api/Consecutivoes/${idConsecutivo}`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Problema');
         }
         return response.json();
     }).then(data => {
         console.log('Datos enviados:', data);
     }).catch(error => {
         console.error('Error:', error);
     });

    
}
