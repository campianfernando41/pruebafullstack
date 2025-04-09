import React from 'react';


const BusTable = ({ buses, onBusClick }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID Bus</th>
                    <th>Número de Bus</th>
                    <th>Placa</th>
                    <th>Características</th>
                    <th>Estado</th>
                    <th>Marca</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {buses.map((bus) => (
                    <tr key={bus.id_bus}>
                        <td>{bus.id_bus}</td>
                        <td>{bus.numero_bus}</td>
                        <td>{bus.placa}</td>
                        <td>{bus.caracteristicas}</td>
                        <td>{bus.estado}</td>
                        <td>{bus.nombre_marca}</td>
                        <td>
                            <button
                                onClick={() => onBusClick(bus.id_bus)}
                                className="btn btn-info"
                            >
                                Ver detalles
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BusTable;
