// import React from 'react';
// import './DetalleConsumoMes.css';


// const DetalleConsumoMes = () => {
//   return (
//     <div className="detalle-container">
//       <div className="header">
//         <h2 className="elfec-title">ELFEC</h2>
//         <p className="cliente-info">Esteban Quito Ruiz - Cliente</p>
//       </div>

//       <div className="text-center">
//         <h2 className="factura-title">
//           Detalle de Consumo (Marzo de 2023)
//         </h2>
//         <p className="info">Número de Factura: <strong>123456</strong></p>
//         <p className="info">Fecha de Emisión: <strong>14 de Septiembre de 2023</strong></p>
//       </div>

//       <hr className="my-4" />

//       <div className="mes-info">
//         <h3 className="mes-title">Marzo</h3>
//         <p className="mes-detail"><strong>Familia:</strong> Esteban Quito Ruiz</p>
//         <p className="mes-detail"><strong>Consumo Total:</strong> 25.12 Kw</p>
//         <p className="mes-detail"><strong>KW Promedio:</strong> 1.2 kw/h</p>
//         <p className="mes-detail"><strong>Consumo en BS:</strong> 190.85</p>
//         <p className="mes-detail"><strong>Total Suministrado:</strong> 25.12 kw/h</p>
//         <p className="mes-detail"><strong>IMP (BS):</strong> 19085</p>
//         <p className="mes-detail"><strong>Meses:</strong> Aplica a corte</p>
//         <div className="text-center mt-4">
//           <button className="btn-atras">Atrás</button>
//           <button className="btn-no ml-4">No</button>
//         </div>
//       </div>

//       <hr className="my-4" />

//       <div className="text-right">
//         <p className="total-pagar">Total a Pagar (Marzo de 2023): <strong>$190.85</strong></p>
//       </div>
//     </div>
//   );
// };

// export default DetalleConsumoMes;


'use client'
import React from "react";
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import TableDebts from "../components/Table";
import { useSearchParams } from "next/navigation";

export default function DetalleConsumoMes({ cliente, mes, numeroFactura, fechaEmision, consumoTotal, kwPromedio, consumoBs, totalSuministrado, impBs }) {
  const params = useSearchParams();
  const [id, setId] = useState([]);
  const [details, setDetails] = useState([]);
  const [formValues, setFormValues] = useState({
    NumeroMedidor: "",
    Consumo: "",
    Lectura: "",
    FechaActualizacion: "",
    CostoReal: "",
    
  });

  useEffect(() => {
    const id = params.get("id");
    setId(id);
 
    fetch(`http://localhost:3000/api/test/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        setFormValues({
          NumeroMedidor: data.NumeroMedidor,
          Consumo: data.Consumo,
          Lectura: data.Lectura,
          FechaActualizacion: data.FechaActualizacion,
          CostoReal: data.CostoReal,
          
        });
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return (
    <div>
      <Navbar />
        <div className="m-6 rounded bg-white p-8">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="header">
            <h2 className="elfec-title">ELFEC</h2>
            <p className="cliente-info">{cliente} - Cliente</p>
          </div>

          <div className="text-center">
            <h2 className="factura-title">
              Detalle de Consumo ({mes})
            </h2>
            <p className="info">Número de Factura: <strong>{numeroFactura}</strong></p>
            <p className="info">Fecha de Emisión: <strong>{formValues.FechaActualizacion}</strong></p>
          </div>

          <hr className="my-4" />

          <div className="mes-info">
            <h3 className="mes-title">{mes}</h3>
            <p className="mes-detail"><strong>Familia:</strong> {cliente}</p>
            <p className="mes-detail"><strong>Consumo Total:</strong> {consumoTotal} Kw</p>
            <p className="mes-detail"><strong>KW Promedio:</strong> {kwPromedio} kw/h</p>
            <p className="mes-detail"><strong>Consumo en BS:</strong> {consumoBs}</p>
            <p className="mes-detail"><strong>Total Suministrado:</strong> {formValues.CostoReal} kw/h</p>
            <p className="mes-detail"><strong>IMP (BS):</strong> {impBs}</p>
            <p className="mes-detail"><strong>Meses:</strong> Aplica a corte</p>
            <div className="text-center mt-4">
              <button className="btn-atras">Atrás</button>
              <button className="btn-no ml-4">No</button>
            </div>
          </div>

          <hr className="my-4" />

          <div className="text-right">
            <p className="total-pagar">Total a Pagar ({mes}): <strong>${impBs}</strong></p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
