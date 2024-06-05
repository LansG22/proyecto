document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message');
    let usuarios = [];

    fetch("json/login.json")
        .then(response => response.json())
        .then(data => {
            usuarios = data.usuarios;
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('username').value;
        const contraseña = document.getElementById('password').value;

        if (validateForm(nombre, contraseña)) {
            const usuario = authenticateUser(nombre, contraseña);
            if (usuario) {
                messageElement.textContent = `Inicio de sesión exitoso. Redirigiendo como ${usuario.rol}...`;
                setTimeout(() => {
                    
                    switch (usuario.rol) {
                        case 'administracion':
                            window.location.href = '/asesoria/admin.html';
                            break;
                        case 'user':
                            window.location.href = '/asesoria/index.html';
                            break;
                        default:
                            window.location.href = '/asesoria/index.html';
                    }
                }, 2000); 
            } else {
                messageElement.textContent = 'Nombre de usuario o contraseña incorrectos';
            }
        } else {
            messageElement.textContent = 'Por favor, completa todos los campos correctamente.';
        }
    });

    function validateForm(nombre, contraseña) {
        if (nombre.trim() === '' || contraseña.trim() === '') {
            return false;
        }
        return true;
    }

    function authenticateUser(nombre, contraseña) {
        return usuarios.find(usuario => usuario.nombre === nombre && usuario.contraseña === contraseña);
    }
});