
document.addEventListener("DOMContentLoaded", function() {
const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      formRegister = document.querySelector(".register"),
      formLogin = document.querySelector(".login");
      var loginButton = document.getElementById('login-submit');

btnSignIn.addEventListener("click", e => {
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");
});

btnSignUp.addEventListener("click", e => {
    formLogin.classList.add("hide");
    formRegister.classList.remove("hide");
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var idToken = googleUser.getAuthResponse().id_token;

    // Puedes guardar el token en el LocalStorage
    localStorage.setItem('googleToken', idToken);

    // Redireccionar a la página principal o realizar otras acciones
    window.location.href = '../hmtl/paginaPrincipal.html';
}


loginButton.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del botón

    var correo = document.getElementById('correo').value;
    var contraseña = document.getElementById('contraseña').value;


    // Obtener el token de Google almacenado en el LocalStorage
     var googleToken = localStorage.getItem('googleToken');

 
        // Verificar si existe el token de Google
        if (googleToken) {
            // Aquí puedes usar el token para autenticar al usuario o realizar otras acciones necesarias

            // Redireccionar a la página principal
            window.location.href = '../hmtl/paginaPrincipal.html';
        } else {
            // Si no se ha iniciado sesión con Google, realizar la lógica de autenticación normal
            fetch('https://localhost:7151/api/Usuarios', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo, contraseña })
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '../hmtl/paginaPrincipal.html';
                } else {
                    alert('Credenciales inválidas');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });

});


