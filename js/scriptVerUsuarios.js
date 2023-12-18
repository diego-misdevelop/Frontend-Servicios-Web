// Agrega un listener al formulario cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('.form');
    cargarUsuarios();
    form.addEventListener('submit', function(event) {
        var volverButtonValue = "Volver";
        var submitButton = document.activeElement; // Botón presionado

        if (submitButton && submitButton.value === volverButtonValue) {
            event.preventDefault(); // Evitar el envío del formulario

            goBack(); // Llama a la función goBack() para volver
        }
    });
    cargarUsuarios();
    cargarRoles();
});

function goBack() {
     window.location.href = '../hmtl/paginaPrincipal.html';
}

function cargarUsuarios(){
fetch('https://localhost:7151/api/Usuarios')
.then(Response =>{
   if(!Response.ok){
       throw new Error('Problema');

   }
   return Response.json();
})
.then(usuarios => {
   mostrarUsuarios(usuarios);
})
.catch(error =>{
console.error('Error:', error);
});

}

function cargarRoles(){
    fetch('https://localhost:7151/api/Rols')
    .then(Response =>{
       if(!Response.ok){
           throw new Error('Problema');
    
       }
       return Response.json();
    })
    .then(roles => {
       mostrarRoles(roles);
    })
    .catch(error =>{
    console.error('Error:', error);
    });
    
    }

function mostrarUsuarios(usuarios) {
    var userList = document.querySelector('.users-container');

    if (userList) {
        usuarios.forEach(usuario => {
            var userElement = document.createElement('div');
            userElement.innerHTML = `
                <p>Id rol: ${usuario.id_rol}</p>
                <p>Nombre: ${usuario.nom_usuario}</p>
            `;
            userList.appendChild(userElement);
        });
    } else {
        console.error('El contenedor de usuarios no se encontró en el DOM.');
    }
}

function mostrarRoles(roles) {
    var userList = document.querySelector('.form-information');

    if (userList) {
        roles.forEach(rol => {
            var userElement = document.createElement('div');
            userElement.innerHTML = `
                <p>Rol: ${rol.nom_rol}</p>
            `;
            userList.appendChild(userElement);
        });
    } else {
        console.error('El contenedor de usuarios no se encontró en el DOM.');
    }
}
