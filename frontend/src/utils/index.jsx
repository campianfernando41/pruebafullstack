// utils/index.js

// Ejemplo de cómo obtener el token, puede ser desde localStorage, cookies, o alguna otra fuente
export const token = localStorage.getItem('token') || '';  // Cambiar según la forma de almacenamiento que uses

// Si tienes una función para obtener el token de manera más compleja, podría lucir así:
export const getToken = () => {
  return localStorage.getItem('token');  // O cualquier otra lógica para obtener el token
};
