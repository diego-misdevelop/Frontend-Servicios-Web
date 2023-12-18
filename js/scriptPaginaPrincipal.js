document.addEventListener("DOMContentLoaded", function() {
    const loginSubmit = document.getElementById("login-submit");
    var logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', cerrarSesion);
    }


    loginSubmit.addEventListener("click", function(event) {
        event.preventDefault();
        
        const emailInput = document.getElementById("correo");
        const passwordInput = document.getElementById("contraseña");
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // Validar usuario y contraseña (usando valores genéricos)
        const validEmail = 'usuario@dominio.com';
        const validPassword = 'contraseña';

        if (emailValue === validEmail && passwordValue === validPassword) {
            // Si coincide, redireccionar a la página principal
            window.location.href = "html\paginaPrincipal.html";
        } else {
            // Si no coincide, mostrar un mensaje de error o manejar de otra manera
            alert("Credenciales inválidas. Por favor, intenta de nuevo.");
        }
    });
    
    function cerrarSesion(event) {
        event.preventDefault();
    
        // Eliminar la cookie de sesión o hacer las acciones necesarias para cerrar la sesión en el backend
        //document.cookie = "nombreDeTuCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Reemplaza "nombreDeTuCookie" con el nombre de tu cookie
    
        // Redirigir a la página de inicio de sesión
        window.location.href = 'html\index.html'; 
    }
    
    
});
