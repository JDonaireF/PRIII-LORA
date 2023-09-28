"use client"
import React, { useEffect, useState } from 'react';
import './styles.css';
import Facture from '../components/TableFacture';

function ConsumoPage() {
  const [consumoData, setConsumoData] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("http://localhost:3000/api/meters")
        .then((response) => response.json())
        .then((data) => {
        setConsumoData(data);
        });
    }
  }, []);

  return (
    <div>
      <h1>Historial de Consumo</h1>
      <Facture consumoData={consumoData}></Facture>
    </div>
  );
}

export default ConsumoPage;

