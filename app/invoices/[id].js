
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Invoice() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      // Realiza una solicitud para obtener los datos del medidor utilizando el ID
      fetch(`/api/getMeterData?meterId=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error al obtener datos del medidor:", error);
        });
    }
  }, [id]);

  if (!data) {
    return <p>Cargando...</p>;
  }

  // Renderiza los datos del medidor aquí
  return (
    <div>
      <h1>Datos del medidor</h1>
      {/* Renderiza los datos del medidor aquí */}
    </div>
  );
}