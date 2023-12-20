// Agrega un listener al formulario cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('.form');
   
    form.addEventListener('submit', function(event) {
        var submitButton = document.activeElement; // Botón presionado

        if (submitButton && submitButton.value === "Llegada de vuelos") {
            event.preventDefault(); // Evitar el envío del formulario

            window.location.href = 'llegadaVuelos.html'; // Redirige a llegadaVuelos.html
        } else if (submitButton && submitButton.value === "Volver") {
            event.preventDefault(); // Evitar el envío del formulario

            window.location.href = '../html/paginaPrincipal.html'; // Redirige a paginaPrincipal.html
        }
    });
    cargarVuelos();
});

function cargarVuelos(){
    fetch('https://localhost:7151/api/Vueloes')
    .then(Response =>{
       if(!Response.ok){
           throw new Error('Problema');
       }
       return Response.json();
    })
    .then(vuelos => {
       mostrarVuelos(vuelos);
    })
    .catch(error =>{
    console.error('Error:', error);
    });
    
    }

function mostrarVuelos(vuelos) {

    const tableBody = document.getElementById('table-body');

        vuelos.forEach(vuelos => {
            const row = document.createElement('tr');

            const codVueloCell = document.createElement('td');
            codVueloCell.textContent = vuelos.cod_vuelo;

            const fecVueloCell = document.createElement('td');
            fecVueloCell.textContent = vuelos.fecha_vuelo;

            const estadoVueloCell = document.createElement('td');
            estadoVueloCell.textContent = vuelos.nom_estadoV;

            const puertaVueloCell = document.createElement('td');
            puertaVueloCell.textContent = vuelos.cod_puerta;
            
            row.appendChild(codVueloCell);
            row.appendChild(fecVueloCell);
            row.appendChild(estadoVueloCell);
            row.appendChild(puertaVueloCell);
            tableBody.appendChild(row);
        });
}
