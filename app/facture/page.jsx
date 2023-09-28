"use client"
import React, { useEffect, useState } from 'react';
import './styles.css';

function ConsumoPage() {
  const [consumoData, setConsumoData] = useState([]);

  useEffect(() => {
    // Realizar la solicitud HTTP GET a la API
    fetch('/api/consumo')
      .then((response) => response.json())
      .then((data) => setConsumoData(data))
      .catch((error) => console.error('Error al obtener datos:', error));
  }, []);

  return (
    <div>
      <h1>Historial de Consumo</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Consumo</th>
            <th>Lectura</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          {consumoData.map((item) => (
            <tr key={item.Id}>
              <td>{item.Id}</td>
              <td>{item.Consumo}</td>
              <td>{item.Lectura}</td>
              <td>{item.FechaRegistro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsumoPage;

