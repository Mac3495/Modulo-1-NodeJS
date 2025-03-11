// Importamos el módulo de Express
const express = require('express');
const app = express();

// Middleware para permitir el uso de JSON en las peticiones
app.use(express.json());

// Datos de prueba: un arreglo de objetos que simula una base de datos temporal
let usuarios = [
  { id: 1, nombre: 'Juan', edad: 28 },
  { id: 2, nombre: 'Ana', edad: 22 },
  { id: 3, nombre: 'Luis', edad: 35 }
];

// Endpoint inicial: Mensaje de bienvenida en la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API REST con Express.js');
});

// Endpoint para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  res.status(200).json(usuarios);
});

// Endpoint para obtener un usuario específico por su ID
app.get('/api/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id); // Convertimos el parámetro a número
    const usuario = usuarios.find(u => u.id === usuarioId); // Buscamos el usuario
    if (!usuario) return res.status(404).send('Usuario no encontrado'); // Si no existe, error 404
    res.status(200).json(usuario); // Si existe, lo devolvemos en formato JSON
});

// Endpoint para crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, edad } = req.body; // Obtenemos datos del cuerpo de la petición
  const nuevoUsuario = {
    id: usuarios.length + 1, // Asignamos un nuevo ID
    nombre,
    edad
  };
  usuarios.push(nuevoUsuario); // Añadimos el nuevo usuario al arreglo
  res.status(201).json(nuevoUsuario); // Devolvemos el usuario creado con el estado 201 (creado)
});

// Endpoint para actualizar un usuario existente
app.put('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id)); // Buscamos el usuario
  if (!usuario) return res.status(404).send('Usuario no encontrado'); // Si no existe, error 404

  const { nombre, edad } = req.body;
  usuario.nombre = nombre || usuario.nombre; // Actualizamos el nombre si se envió, sino mantenemos el actual
  usuario.edad = edad || usuario.edad; // Igual con la edad

  res.status(200).json(usuario); // Devolvemos el usuario actualizado
});

// Endpoint para eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
  const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id)); // Buscamos el índice del usuario
  if (usuarioIndex === -1) return res.status(404).send('Usuario no encontrado'); // Si no existe, error 404

  const usuarioEliminado = usuarios.splice(usuarioIndex, 1); // Eliminamos el usuario del arreglo
  res.status(200).json(usuarioEliminado); // Devolvemos el usuario eliminado
});

// Configuración del puerto y levantamiento del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
