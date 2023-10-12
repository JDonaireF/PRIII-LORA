'use client';
import React from "react";
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import CardMeters from "../components/Meter";

function Meters() {
    const [meters, setMeters] = useState([]);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        fetch("https://dbloratest.000webhostapp.com/api/meters")
          .then((response) => response.json())
          .then((data) => {
            setMeters(data);
          });
      }
    }, []);
    return(
      <div>
        <Navbar />
        <div className="m-6 rounded bg-white p-8">
            <CardMeters dataMeters={meters}></CardMeters>
        </div>
      </div>
    )
}

export default Meters;