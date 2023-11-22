'use client';
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react";
import Navbar from '../components/Navbar'
import CardMeters from "../components/Meter";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

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
          const promises = data.map((meter) =>
            fetch(`http://elfecapitest.somee.com/api/Users/getClient?meterNumber=${meter.NumeroMedidor}`)
              .then((response) => response.json())
          );

          Promise.all(promises)
            .then((responses) => {
              const metersWithClient = data.map((meter, index) => ({
                ...meter,
                NombreCliente: responses[index]?.fullName
              }));
              setMeters(metersWithClient);
            });
        });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="m-6 rounded bg-white p-8">
        <div className="mb-2 text-gray-500 font-medium">
          {/* Zona: {session.user?.zone} */}
        </div>
        <div className="flex text-gray-600 font-semibold justify-center">
          HABILITADOS
        </div>
        <CardMeters dataMeters={meters} status={'enabled'}></CardMeters>
      </div>
    </div>
  )
}