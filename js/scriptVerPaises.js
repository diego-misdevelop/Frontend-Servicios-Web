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

        const tableBody = document.getElementById('table-body');
    
        paises.forEach(paises => {
                const row = document.createElement('tr');
    
                const idPaisCell = document.createElement('td');
                idPaisCell.textContent = paises.id_pais;
    
                const nomPaisCell = document.createElement('td');
                nomPaisCell.textContent = paises.nom_pais;

                const editButtonCell = document.createElement('td');
   
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.classList.add('edit-button');
                editButton.addEventListener('click', function() {
                    editar(consecutivos.id_consecutivo);
                });
                editButtonCell.appendChild(editButton);
                row.appendChild(idPaisCell);
                row.appendChild(nomPaisCell);
                row.appendChild(editButtonCell);
                tableBody.appendChild(row);
            });
    }
    
function editar(id) {
    // Aquí puedes redirigir a la página de edición con el ID del rol
    window.location.href = '../html/editarConsecutivo.html?id=${id}';
}
