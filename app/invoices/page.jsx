'use client'

import React from 'react';
import './TresCuadrosConsumo.css';
import CardMetersClient from '../components/MetersClient';
import { useEffect, useState } from "react";

const TresCuadrosConsumo = () => {
  const [meters, setMeters] = useState([]);


    useEffect(() => {

      if (typeof window !== "undefined") {

        fetch("http://localhost:3000/api/client")

          .then((response) => response.json())

          .then((data) => {

            setMeters(data);

          });

      }

    }, []);
   return (
    
    <CardMetersClient dataMeters={meters}>
      
    </CardMetersClient>

  //   <div className="tres-cuadros-container">
  //   {/* Contenido ELFEC y cliente */}
  //   <div className="header">
  //     <h2 className="elfec-title">ELFEC</h2>
  //     <p className="cliente-info">Esteban Quito Ruiz - Cliente</p>
  //   </div>
  
  //   <div className="text-center">
  //     <h2 className="factura-title">
  //       Factura de Consumo Eléctrico
  //     </h2>
  //     <p className="info">Número de Factura: <strong>123456</strong></p>
  //     <p className="info">Fecha de Emisión: <strong>14 de Septiembre de 2023</strong></p>
  //   </div>
  
  //   <hr className="my-4" />
  
  //   {/* Cuadros de consumo */}
  //   <div className="cuadro-container">
  //     <div className="mes-info">
  //       <h3 className="mes-title">Septiembre de 2023</h3>
  //       <p className="mes-detail"><strong>Consumo Actual:</strong> 25.12 Kw</p>
  //       <p className="mes-detail"><strong>Historial de Registro de Consumo por Horas (Última Semana):</strong></p>
  //       <ul className="list-detail">
  //         <li><strong>Septiembre 1, 2023:</strong> 51.4 KW</li>
  //         <li><strong>Septiembre 2, 2023:</strong> 53.2 KW</li>
  //         <li><strong>Septiembre 3, 2023:</strong> 25.5 KW</li>
  //         <li><strong>Septiembre 4, 2023:</strong> 45.5 KW</li>
  //         <li><strong>Septiembre 5, 2023:</strong> 48.2 KW</li>
  //         <li><strong>Septiembre 6, 2023:</strong> 49.7 KW</li>
  //         <li><strong>Septiembre 7, 2023:</strong> 52.1 KW</li>
  //       </ul>
  //       <div className="text-center mt-4">
  //         <button className="btn-ver-mas">Ver Más</button>
  //       </div>
  //     </div>
  
  //     <div className="mes-info">
  //       <h3 className="mes-title">Octubre de 2023</h3>
  //       <p className="mes-detail"><strong>Consumo Actual:</strong> 30.45 Kw</p>
  //       <p className="mes-detail"><strong>Historial de Registro de Consumo por Horas (Última Semana):</strong></p>
  //       <ul className="list-detail">
  //         <li><strong>Octubre 1, 2023:</strong> 49.8 KW</li>
  //         <li><strong>Octubre 2, 2023:</strong> 55.2 KW</li>
  //         <li><strong>Octubre 3, 2023:</strong> 28.5 KW</li>
  //         <li><strong>Octubre 4, 2023:</strong> 47.3 KW</li>
  //         <li><strong>Octubre 5, 2023:</strong> 50.7 KW</li>
  //         <li><strong>Octubre 6, 2023:</strong> 51.9 KW</li>
  //         <li><strong>Octubre 7, 2023:</strong> 53.6 KW</li>
  //       </ul>
  //       <div className="text-center mt-4">
  //         <button className="btn-ver-mas">Ver Más</button>
  //       </div>
  //     </div>
  
  //     <div className="mes-info">
  //       <h3 className="mes-title">Noviembre de 2023</h3>
  //       <p className="mes-detail"><strong>Consumo Actual:</strong> 28.76 Kw</p>
  //       <p className="mes-detail"><strong>Historial de Registro de Consumo por Horas (Última Semana):</strong></p>
  //       <ul className="list-detail">
  //         <li><strong>Noviembre 1, 2023:</strong> 50.2 KW</li>
  //         <li><strong>Noviembre 2, 2023:</strong> 52.8 KW</li>
  //         <li><strong>Noviembre 3, 2023:</strong> 27.9 KW</li>
  //         <li><strong>Noviembre 4, 2023:</strong> 49.1 KW</li>
  //         <li><strong>Noviembre 5, 2023:</strong> 51.7 KW</li>
  //         <li><strong>Noviembre 6, 2023:</strong> 53.4 KW</li>
  //         <li><strong>Noviembre 7, 2023:</strong> 55.8 KW</li>
  //       </ul>
  //       <div className="text-center mt-4">
  //         <button className="btn-ver-mas">Ver Más</button>
  //       </div>
  //     </div>
  //   </div>
  
  //   <hr className="my-4" />
  
  //   <div className="text-right">
  //     <p className="total-pagar">Total a Pagar (Septiembre de 2023): <strong>$50.00</strong></p>
  //     <p className="total-pagar">Total a Pagar (Octubre de 2023): <strong>$60.00</strong></p>
  //     <p className="total-pagar">Total a Pagar (Noviembre de 2023): <strong>$55.00</strong></p>
  //   </div>
  
  //   <div className="text-center mt-8">
  //     <button className="btn-ver-deudas">Ver Deudas</button>
  //   </div>
  // </div>
  );
};

export default TresCuadrosConsumo;
