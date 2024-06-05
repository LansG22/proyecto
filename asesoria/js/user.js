document.addEventListener('DOMContentLoaded', () => {
    const usernameDisplay = document.getElementById("usernameDisplay");
    const usersTable = document.querySelector("#usersTable tbody");

    
    fetch("json/login.json")
        .then(response => response.json())
        .then(data => {
            const usuarios = data.usuarios;

            const usuario = usuarios[0]; 
            if (usuario) {
                usernameDisplay.textContent = `Usuario: ${usuario.nombre}`;
            }

        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
