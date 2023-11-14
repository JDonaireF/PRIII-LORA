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
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar'

export default function ConsumeDetails({}) {
  const { data: session } = useSession();
  const [id, setId] = useState(null);
  const [details, setDetails] = useState(null);
  const [formValues, setFormValues] = useState({
    NumeroMedidor: "",
    Consumo: "",
    Lectura: "",
    Costo: "",
    FechaRegistro: "",
    FechaActualizacion: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if(id) {
      fetch(`http://localhost:3000/api/client/getDetailsById/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        setFormValues({
          NumeroFactura: data.Id,
          NumeroMedidor: data.NumeroMedidor,
          Consumo: data.ConsumoFinal,
          Lectura: data.LecturaFinal,
          Costo: data.CostoTotal,
          FechaRegistro: data.FechaRegistro,
          FechaActualizacion: data.FechaActualizacion,
        });
      })
      .catch((error) => {
        console.error('Error fetching details:', error);
      });
    }
    setId(id);
  }, []);

  return (
    <div>
      <Navbar />
        <div className="m-6 rounded bg-white p-8">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="header">
            <p className="cliente-info"> - Cliente</p>
          </div>
          <div className="text-center">
            <h2 className="factura-title">
              Detalle de Consumo
            </h2>
            <p className="info">Número de Factura: <strong> {formValues.NumeroFactura}</strong></p>
            <p className="info">Fecha de Emisión: <strong> {new Date(formValues.FechaRegistro).toLocaleDateString()}</strong></p>
          </div>

          <hr className="my-4" />
          <div className="mes-info">
            <h3 className="mes-title"></h3>
            <p className="mes-detail"><strong>Familia: {session?.user.fullName}</strong> </p>
            <p className="mes-detail"><strong>Consumo Total:</strong> {formValues.Consumo} Kw</p>
            <p className="mes-detail"><strong>KW Promedio:</strong> 0.6 kw/h</p>
            <p className="mes-detail"><strong>Consumo en BS:</strong> {formValues.Costo} Bs.</p>
            <p className="mes-detail"><strong>Meses:</strong> Aplica a corte</p>
            <div className="text-center mt-4">
              <Link href="/invoices">Volver</Link>
            </div>
          </div>
          <hr className="my-4" />

          <div className="text-right">
            <p className="total-pagar">Total a Pagar ({formValues.Costo}): <strong>Bs.</strong></p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
