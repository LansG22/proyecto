document.addEventListener('DOMContentLoaded', () => {
    const usernameDisplay = document.getElementById("usernameDisplay");
    let usuarios = [];

    fetch("json/login.json")
        .then(response => response.json())
        .then(data => {
            usuarios = data.usuarios;
            const usuario = usuarios[0]; 
            if (usuario) {
                usernameDisplay.textContent = `Bienvenido, ${usuario.nombre}`;
            }
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
//aca para que salga el nombre del usuario que ingreso
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

          
            usuarios.forEach(usuario => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.rol}</td>
                    <td>${usuario.rango}</td>
                `;
                usersTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});


document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const editButton = document.getElementById('editButton');
    const deleteButton = document.getElementById('deleteButton');
    const usersTableBody = document.querySelector('#usersTable tbody');
    let usuarios = [];


    fetch("json/usuarios.json")
        .then(response => response.json())
        .then(data => {
            usuarios = data.usuarios;
            renderUsersTable(usuarios);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

  
    function renderUsersTable(usuarios) {
     
        usersTableBody.innerHTML = '';


        usuarios.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.rol}</td>
            `;
            usersTableBody.appendChild(row);
        });
    }

 
    addButton.addEventListener('click', () => {
        const id = prompt('Ingrese el ID del nuevo usuario:');
        const nombre = prompt('Ingrese el nombre del nuevo usuario:');
        const contraseña = prompt('Ingrese la contraseña del nuevo usuario:');
        const rol = prompt('Ingrese el rol del nuevo usuario:');

      
        const newUser = {
            id: id,
            nombre: nombre,
            contraseña: contraseña,
            rol: rol
        };

      
        usuarios.push(newUser);

 
        renderUsersTable(usuarios);
    });

   
    editButton.addEventListener('click', () => {
        const id = prompt('Ingrese el ID del usuario a modificar:');
        const usuarioIndex = usuarios.findIndex(user => user.id === id);

        if (usuarioIndex !== -1) {
            const nombre = prompt('Ingrese el nuevo nombre del usuario:');
            const contraseña = prompt('Ingrese la nueva contraseña del usuario:');
            const rol = prompt('Ingrese el nuevo rol del usuario:');

          
            usuarios[usuarioIndex].nombre = nombre;
            usuarios[usuarioIndex].contraseña = contraseña;
            usuarios[usuarioIndex].rol = rol;

       
            renderUsersTable(usuarios);
        } else {
            alert('El usuario con ese ID no existe.');
        }
    });


    deleteButton.addEventListener('click', () => {
        const id = prompt('Ingrese el ID del usuario a eliminar:');
        const usuarioIndex = usuarios.findIndex(user => user.id === id);

        if (usuarioIndex !== -1) {
 
            usuarios.splice(usuarioIndex, 1);

   
            renderUsersTable(usuarios);
        } else {
            alert('El usuario con ese ID no existe.');
        }
    });
});