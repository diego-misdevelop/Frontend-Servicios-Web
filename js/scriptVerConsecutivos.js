// Agrega un listener al formulario cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('.form');
    form.addEventListener('submit', function(event) {
        var volverButtonValue = "Volver";
        var nuevoConsecutivo = "Nuevo consecutivo"
        var submitButton = document.activeElement; // Botón presionado
        if (submitButton && submitButton.value === nuevoConsecutivo) {
            event.preventDefault(); // Evitar el envío del formulario

            window.location.href = '../html/nuevoConsecutivo.html'; // Redirige a llegadaVuelos.html
        }
        if (submitButton && submitButton.value === volverButtonValue) {
            event.preventDefault(); // Evitar el envío del formulario

            goBack(); // Llama a la función goBack() para volver
        }
    });
    cargarConsecutivos();
});

function goBack() {
     window.location.href = '../html/paginaPrincipal.html';
}


function cargarConsecutivos(){
    fetch('https://localhost:7151/api/Consecutivoes')
    .then(Response =>{
       if(!Response.ok){
           throw new Error('Problema');
    
       }
       return Response.json();
    })
    .then(consecutivos => {
        mostrarConsecutivos(consecutivos);
    })
    .catch(error =>{
    console.error('Error:', error);
    });
    
    }

    function mostrarConsecutivos(consecutivos) {

        const tableBody = document.getElementById('table-body');
    
        consecutivos.forEach(consecutivos => {
                const row = document.createElement('tr');
    
                const codConsecCell = document.createElement('td');
                codConsecCell.textContent = consecutivos.id_consecutivo;
    
                const nomConsecCell = document.createElement('td');
                nomConsecCell.textContent = consecutivos.descripcion_consecutivo;

                const prefConsecCell = document.createElement('td');
                prefConsecCell.textContent = consecutivos.prefijo_consecutivo;

                const editButtonCell = document.createElement('td');
   
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.classList.add('edit-button');
                editButton.addEventListener('click', function() {
                    editar(consecutivos.id_consecutivo);
                });
                editButtonCell.appendChild(editButton);
                row.appendChild(codConsecCell);
                row.appendChild(nomConsecCell);
                row.appendChild(prefConsecCell);
                row.appendChild(editButtonCell);
                tableBody.appendChild(row);
            });
    }

function editar(id) {
    // Aquí puedes redirigir a la página de edición con el ID del rol
    window.location.href = `../html/editarConsecutivo.html?id=${id}`;
}
