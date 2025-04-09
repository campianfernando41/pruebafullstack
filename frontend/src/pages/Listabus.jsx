import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import BusTable from '../components/BusTable';
import Pagination from '../components/Pagination';
import { token } from "../utils/index";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [busesPerPage] = useState(5); // Muestra 5 buses por página

  useEffect(() => {
    if (!token) {
      setError("Token no disponible");
      setLoading(false);
      return;
    }

    // Solicitar los buses desde la API
    axios.get('http://localhost:3001/api/bus', {
        headers: {
          'x-api-key': 'tu_clave_de_api_aqui'
        }
      })
      .then((response) => {
        // Asegúrate de que `response.data` tiene la propiedad `buses` que es un array
        if (Array.isArray(response.data.buses)) {
          setBuses(response.data.buses); // Establecer los buses
        } else {
          setError("Los datos de buses no están en el formato esperado.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar los buses:', err);
        setError('Error al cargar los buses');
        setLoading(false);
      });
  }, [token]); // Añadir 'token' en las dependencias si es necesario

  // Calcular los buses que deben mostrarse en la página actual
  const indexOfLastBus = currentPage * busesPerPage;
  const indexOfFirstBus = indexOfLastBus - busesPerPage;
  const currentBuses = buses.slice(indexOfFirstBus, indexOfLastBus);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(buses.length / busesPerPage);

  const handleBusClick = (id) => {
    axios.get(`http://localhost:3001/api/bus/${id}`, {
      headers: {
        'x-api-key': 'tu_clave_de_api_aqui'
      }
    })
    .then((response) => {
      const bus = response.data; // Asignar correctamente los datos del bus
      if (bus) {
        // Mostrar los detalles del bus usando SweetAlert
        Swal.fire({
          title: `Detalles del Bus #${bus.id_bus}`,
          html: `
            <strong>Número de bus:</strong> ${bus.numero_bus} <br />
            <strong>Placa:</strong> ${bus.placa} <br />
            <strong>Características:</strong> ${bus.caracteristicas} <br />
            <strong>Estado:</strong> ${bus.estado} <br />
            <strong>Marca:</strong> ${bus.nombre_marca}
          `,
          icon: 'info',
          confirmButtonText: 'Cerrar'
        });
      } else {
        setError("No se encontraron detalles del bus.");
      }
    })
    .catch((err) => {
      console.error('Error al obtener los detalles del bus:', err);
      setError('Error al cargar los detalles del bus');
    });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (buses.length === 0) return <p>No hay buses disponibles.</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Buses</h1>
      <BusTable 
        buses={currentBuses} 
        onBusClick={handleBusClick} // Pasa la función de manejo al componente BusTable
      />
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default BusList;
