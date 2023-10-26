'use client';
import React from "react";
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import CardMeters from "../components/Meter";
import { useSession } from "next-auth/react"

export default function Meters() {
    const [meters, setMeters] = useState([]);
    const { data: session } = useSession();

    if (session?.user.role === "Cliente") {
      return <div className="flex items-center justify-center">No estas autorizado para ver esta pagina!</div>
    }

    useEffect(() => {
      if (typeof window !== "undefined") {
        fetch("http://localhost:3000/api/meters/enabled")
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
            <CardMeters dataMeters={meters} status={'enabled'}></CardMeters>
        </div>
      </div>
    )
}