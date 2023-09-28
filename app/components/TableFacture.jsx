'use client';
import Link from 'next/link';

function Facture ({consumoData}) {
    return (
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
    );
}

export default Facture;