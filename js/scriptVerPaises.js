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
    cargarPaises();
});
 
function goBack() {
     window.location.href = '../html/paginaPrincipal.html';
}
 
function cargarPaises(){
    fetch('https://localhost:7151/api/Pais')
    .then(Response =>{
       if(!Response.ok){
           throw new Error('Problema');
    
       }
       return Response.json();
    })
    .then(paises => {
       mostrarPaises(paises);
    })
    .catch(error =>{
    console.error('Error:', error);
    });
    
    }
 
    function mostrarPaises(paises) {
        var usersContainer = document.querySelector('.users-container');
    
        if (usersContainer) {
            paises.forEach(pais => {
                var userCard = document.createElement('div');
                userCard.classList.add('user-card');
    
                var userId = document.createElement('p');
                userId.textContent = `ID País: ${pais.id_pais}`;
                userCard.appendChild(userId);
    
                var userDescription = document.createElement('p');
                userDescription.textContent = `Nombre país: ${pais.nom_pais}`;
                userCard.appendChild(userDescription);
    
                var editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.classList.add('edit-button');
                editButton.addEventListener('click', function() {
                    editar(pais.id_consecutivo);
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
