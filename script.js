
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

loginButton.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del botón

    var correo = document.getElementById('correo').value;
    var contraseña = document.getElementById('contraseña').value;

    // Realizar la lógica de autenticación aquí
    // Esto puede ser una solicitud fetch al servidor para verificar las credenciales
    // Por ejemplo:
    fetch('https://localhost:7151/api/Usuarios', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify({ correo, contraseña })
    })
    .then(response => {
        if (response.ok) {
            // Si las credenciales son correctas, redirigir a la página principal
            window.location.href = 'paginaPrincipal.html';
        } else {
            // Si las credenciales no son válidas, mostrar un mensaje al usuario
            alert('Credenciales inválidas');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Manejar el error de la solicitud
    });
});
});


