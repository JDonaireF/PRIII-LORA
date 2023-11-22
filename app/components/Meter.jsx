'use client';
import Link from 'next/link';

function CardMeters({dataMeters, status}) {
    const handleDisableMeter = (event) => {
        event.preventDefault();
        const id = document.getElementById("id").value;
        fetch(`http://localhost:3000/api/meters/updateDisableMeterById/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            if (response.ok) {
                window.location.reload();
            } else {
            confirm("Error");
            }
        });
    };

    const handleEnableMeter = (event) => {
        event.preventDefault();
        const id = document.getElementById("id").value;
        fetch(`http://localhost:3000/api/meters/updateEnableMeterById/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
                window.location.reload();
            } else {
              confirm("Error");
            }
        });
    };

  return (
    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {dataMeters ? (
         dataMeters.map(meter => (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200">
            <div className="px-6 py-4">
                <div className="font-bold text-center text-blue-600 mb-2">Medidor {meter.NumeroMedidor}</div>
                <p className="text-gray-700 text-sm font-medium">
                    Cliente: {meter.NombreCliente}
                </p>
            </div>
            <div className="rounded bg-white mx-4 p-2 text-sm">
                <div className="grid grid-cols-2 gap-8 mt-6">
                    <div className="text-center">
                        <p className="font-bold p-2">Consumo</p>
                        <p>{meter.Consumo} W</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold p-2">Hora/Registro</p>
                        <p>{new Date(meter.FechaRegistro).toLocaleTimeString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold p-2">Lectura</p>
                        <p>{meter.Lectura}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold p-2">Total</p>
                        <p>{meter.Costo} Bs.</p>
                    </div>
                </div>
                <div className="text-center p-4 mt-4">
                    <Link href={`/consume-history?id=${meter.Id}`} className="bg-black hover:bg-slate-400 text-white text-sm font-bold py-2 px-4 rounded">
                        VER CONSUMO
                    </Link>
                </div>
            </div>
            <div className="m-2 text-center">
                {status == 'enabled' ? (
                    <form className="space-y-6" method="POST">
                        <input type="hidden" name="id" id="id" value={meter.Id}/>
                        <button onClick={handleDisableMeter} type="submit" className="bg-transparen hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 text-sm font-bold m-2 p-2 rounded">
                            DESHABILITAR
                        </button>
                        <Link href={`/debts?id=${meter.Id}`} className="bg-transparen hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 text-sm font-bold m-2 p-2 rounded">
                            VER DEUDAS
                        </Link>
                    </form>
                ): (
                    <form className="space-y-6" method="POST">
                        <input type="hidden" name="id" id="id" value={meter.Id}/>
                        <button onClick={handleEnableMeter} type="submit" className="bg-transparen hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 text-sm font-bold m-2 p-2 rounded">
                            HABILITAR
                        </button>
                        <Link href={`/debts?id=${meter.Id}`} className="bg-transparen hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 text-sm font-bold m-2 p-2 rounded">
                            VER DEUDAS
                        </Link>
                    </form>
                )}
            </div>
        </div>
        ))
        ):(
        <div className="text-gray-900">
            <h1>No hay medidores disponibles.</h1>
        </div>
        )}
    </div>
  );
}

export default CardMeters;