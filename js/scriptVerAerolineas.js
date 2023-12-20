// Agrega un listener al formulario cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('.form');
    const btnLlegadaVuelos = document.querySelector('input[value="Llegada de vuelos"]');

    btnLlegadaVuelos.addEventListener('click',function(event){
        event.preventDefault();
        window.location.href = 'llegadaVuelos.html';
        });
    

    form.addEventListener('submit', function(event) {
        var volverButtonValue = "Volver";
        var submitButton = document.activeElement; // Botón presionado

        if (submitButton && submitButton.value === volverButtonValue) {
            event.preventDefault(); // Evitar el envío del formulario

            goBack(); // Llama a la función goBack() para volver
        }
        
    });
    cargarAerolineas();
});  

function goBack() {
     window.location.href = '../html/paginaPrincipal.html';
}


function cargarAerolineas(){
    fetch('https://localhost:7151/api/Aerolineas')
    .then(Response =>{
       if(!Response.ok){
           throw new Error('Problema');
    
       }
       return Response.json();
    })
    .then(aerolineas => {
        mostrarAerolineas(aerolineas);
    })
    .catch(error =>{
    console.error('Error:', error);
    });
    
    }
    
    function mostrarAerolineas(aerolineas) {

        const tableBody = document.getElementById('table-body');
    
        aerolineas.forEach(aerolineas => {
                const row = document.createElement('tr');
    
                const codAeroCell = document.createElement('td');
                codAeroCell.textContent = aerolineas.id_aerolinea;
    
                const nomAeroCell = document.createElement('td');
                nomAeroCell.textContent = aerolineas.nom_aerolinea;

                const editButtonCell = document.createElement('td');
   
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.classList.add('edit-button');
                editButton.addEventListener('click', function() {
                    editar(aerolineas.id_consecutivo);
                });
                editButtonCell.appendChild(editButton);
                row.appendChild(codAeroCell);
                row.appendChild(nomAeroCell);
                row.appendChild(editButtonCell);
                tableBody.appendChild(row);
            });
    }
    
function editar(id) {
    // Aquí puedes redirigir a la página de edición con el ID del rol
    window.location.href = '../html/editarConsecutivo.html?id=${id}';
}
