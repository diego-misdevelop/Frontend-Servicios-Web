const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      formRegister = document.querySelector(".register"),
      formLogin = document.querySelector(".login");

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

  // Aquí puedes enviar la información al backend para autenticar al usuario
  // y establecer la sesión del usuario en tu aplicación.
  // Por ejemplo, podrías enviar el token al servidor para verificar la autenticidad del usuario.

  // Envío del token al backend (ejemplo con fetch)
  fetch('/ruta/al/backend', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: idToken })
  })
  .then(response => response.json())
  .then(data => {
      // Procesar la respuesta del backend o redirigir al usuario a la página principal, etc.
  })
  .catch(error => console.error('Error:', error));
}
