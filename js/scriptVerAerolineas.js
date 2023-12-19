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
        var usersContainer = document.querySelector('.users-container');
    
        if (usersContainer) {
            aerolineas.forEach(aerolineas => {
                var userCard = document.createElement('div');
                userCard.classList.add('user-card');
    
                var userId = document.createElement('p');
                userId.textContent = `ID Aerolínea: ${aerolineas.id_aerolinea}`;
                userCard.appendChild(userId);
    
                var userDescription = document.createElement('p');
                userDescription.textContent = `Nombre Aerolínea: ${aerolineas.nom_aerolinea}`;
                userCard.appendChild(userDescription);
    
                var editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.classList.add('edit-button');
                editButton.addEventListener('click', function() {
                    editar(aerolineas.id_consecutivo);
                });
                userCard.appendChild(editButton);
    
                usersContainer.appendChild(userCard);
            });
        } else {
            console.error('El contenedor de usuarios no se encontró en el DOM.');
        }
    }
    

function editar(id) {
    // Aquí puedes redirigir a la página de edición con el ID del rol
    window.location.href = '../html/editarConsecutivo.html?id=${id}';
}
