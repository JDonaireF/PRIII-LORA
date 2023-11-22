'use client'

import React from 'react';
import './TresCuadrosConsumo.css';
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import CardMetersClient from '../components/MetersClient';

export default function MetersMonth () {
  const [meters, setMeters] = useState([]);
  const [status, setStatus] = useState({});

    useEffect(() => {
      if (typeof window !== "undefined") {
        fetch("http://localhost:3000/api/client")
          .then((response) => response.json())
          .then((data) => {
            setMeters(data);
          });
      }
    }, []);

    useEffect(() => {
      if (typeof window !== "undefined") {
        fetch("http://localhost:3000/api/client/getMeterByNumber")
          .then((response) => response.json())
          .then((data) => {
            setStatus( data.Estado);
          });
      }
    }, []);

   return (
    <div>
      <Navbar />
      <div className="m-6 rounded bg-white p-8">
        <div className='flex justify-end'>
          {status == 1 ? (
            <span class="bg-green-100 text-green-300 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-400 dark:text-white">Habilitado</span>
          ):(
            <span class="bg-red-200 text-red-400 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-500 dark:text-white">Deshabilitado</span>
          )}
        </div>
        <CardMetersClient dataMeters={meters}></CardMetersClient>
      </div>
    </div>
  );
};
