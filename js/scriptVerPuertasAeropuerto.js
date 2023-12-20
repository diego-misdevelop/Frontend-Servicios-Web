// Agrega un listener al formulario cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('.form');

    form.addEventListener('submit', function(event) {
        var volverButtonValue = "Volver";
        var submitButton = document.activeElement; // Botón presionado

        if (submitButton && submitButton.value === volverButtonValue) {
            event.preventDefault(); // Evitar el envío del formulario

            goBack(); // Llama a la función goBack() para volver
        }
    });
    cargarPuertasAeropuerto();
});

function goBack() {
     window.location.href = '../html/paginaPrincipal.html';
}


function cargarPuertasAeropuerto(){
    fetch('https://localhost:7151/api/Puertas')
    .then(Response =>{
       if(!Response.ok){
           throw new Error('Problema');
    
       }
       return Response.json();
    })
    .then(puertas => {
       mostrarPuertas(puertas);
    })
    .catch(error =>{
    console.error('Error:', error);
    });
    
    }

    function mostrarPuertas(puertas) {

        const tableBody = document.getElementById('table-body');
    
        puertas.forEach(puertas => {
                const row = document.createElement('tr');
    
                const codPuertaCell = document.createElement('td');
                codPuertaCell.textContent = puertas.cod_puerta;
    
                const numPuertaCell = document.createElement('td');
                numPuertaCell.textContent = puertas.num_puerta;

                const detPuertaCell = document.createElement('td');
                detPuertaCell.textContent = puertas.detalle_puerta;

                const nomEstCell = document.createElement('td');
                nomEstCell.textContent = puertas.nom_estadoP;

                const idAeroCell = document.createElement('td');
                idAeroCell.textContent = puertas.id_aerolinea;

                const editButtonCell = document.createElement('td');
   
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.classList.add('edit-button');

                editButtonCell.appendChild(editButton);
                row.appendChild(codPuertaCell);
                row.appendChild(numPuertaCell);
                row.appendChild(detPuertaCell);
                row.appendChild(nomEstCell);
                row.appendChild(idAeroCell);
                row.appendChild(editButtonCell);
                tableBody.appendChild(row);
            });
    }
    
function editar(id) {
    // Aquí puedes redirigir a la página de edición con el ID del rol
    window.location.href = '../html/editarConsecutivo.html?id=${id}';
}
