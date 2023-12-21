// Agrega un listener al formulario cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('.roles-lista');
    form.addEventListener('submit', function(event) {
        var volverButtonValue = "Volver";
        var submitButton = document.activeElement; // Botón presionado

        if (submitButton && submitButton.value === volverButtonValue) {
            event.preventDefault(); // Evitar el envío del formulario
            actualizarRol();
            goBack(); // Llama a la función goBack() para volver
        }
    });
    cargarUsuarios();
    cargarRoles();
});

function goBack() {
     window.location.href = '../html/paginaPrincipal.html';
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
    var userList = document.querySelector('.users-list');

    if (userList) {
        usuarios.forEach(usuario => {
            var userElement = document.createElement('div');
            userElement.innerHTML = `
                <Input type="radio" name="usuario" value="${usuario.id_usuario}">
                <label>${usuario.nom_usuario}</label><br>
            `;
            userList.appendChild(userElement);
        });
    } else {
        console.error('El contenedor de usuarios no se encontró en el DOM.');
    }
}

function mostrarRoles(roles) {
    var rolesForm = document.querySelector('.roles-lista');

    if (rolesForm) {
        roles.forEach(rol => {
            var rolElement = document.createElement('div');
            rolElement.innerHTML = `
            <Input type="checkbox" name="rol" value="${rol.id_rol}">
            <label>${rol.nom_rol}</label><br>
            `;
            rolesForm.appendChild(rolElement);
        });
    } else {
        console.error('El contenedor de roles no se encontró en el DOM.');
    }
}


function actualizarUsuario() {
    var userId = obtenerIdUsuarioSeleccionado();
    var rolId = obtenerIdRolSeleccionado();

    if (!userId || !rolId) {
        console.error('Seleccione un usuario y un rol');
        return;
    }
    obtenerUsuario(userId)
        .then(usuario => {
            if (!usuario) {
                console.error('Usuario no encontrado');
                return;
            }
            usuario.rol = rolId;
            enviarUsuarioActualizado(usuario);
        })
        .catch(error => {
            console.error('Error al obtener usuario:', error);
        });
}
function obtenerUsuario(userId) {
    return fetch(`https://localhost:7151/api/Usuarios/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Problema al obtener usuario');
            }
            return response.json();
        })
        .catch(error => {
            throw new Error('Error al obtener usuario:', error);
        });
}

function actualizarRol() {
    var userId = obtenerIdUsuarioSeleccionado();
    var rolId = obtenerIdRolSeleccionado();


    if(!userId||!rolId){
        alert('Seleccione un usuario y un rol');
        return;
    }

    obtenerDatosUsuario(userId)
    .then(datosUsuario =>{
        return actualizarUsuarioConNuevoRol(datosUsuario,rolId);
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Error');
        }
        return;
    })
    .then(data =>{
        alert('Rol del usuario actualizado');
    })
    .catch(error => {
        console.log('Error',error);
    })


}

function goBack() {
    window.location.href = '../html/paginaPrincipal.html';
}

function actualizarUsuarioConNuevoRol(datosUsuario,nuevoRolId){
    
    const{id_usuario,nom_usuario,pri_apellido,seg_apellido,correo_usuario,contra_usuario,pregunta_seguridad,respuesta_seguridad}=datosUsuario;
    
    const data={
        id_usuario,
        nom_usuario,
        pri_apellido,
        seg_apellido,
        correo_usuario,
        contra_usuario,
        pregunta_seguridad,
        respuesta_seguridad,
        "id_rol":nuevoRolId
    }
    return fetch(`https://localhost:7151/api/Usuarios/${datosUsuario.id_usuario}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}


function obtenerDatosUsuario(id_usuario) {
    return fetch(`https://localhost:7151/api/Usuarios/${id_usuario}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del usuario');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function obtenerIdUsuarioSeleccionado() {
    var usuarioSeleccionado = document.querySelector('input[name="usuario"]:checked');
    return usuarioSeleccionado ? usuarioSeleccionado.value : null;
}

function obtenerIdRolSeleccionado() {
    var rolSeleccionado = document.querySelector('input[name="rol"]:checked');
    return rolSeleccionado ? rolSeleccionado.value : null;
}
