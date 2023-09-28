'use client';
import React from "react";
import { useEffect, useState } from "react";
import CardMeters from "../components/Meter";

function Meters() {
    const [meters, setMeters] = useState([]);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        fetch("http://localhost:3000/api/meters")
          .then((response) => response.json())
          .then((data) => {
            setMeters(data);
          });
      }
    }, []);
    return(
        <div className="m-6 rounded bg-white p-8">
            <CardMeters dataMeters={meters}></CardMeters>
        </div>
    )
}

export default Meters;