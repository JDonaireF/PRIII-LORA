'use client';
import Link from 'next/link';

function CardMeters({dataMeters}) {
  return (
    <div className="grid grid-cols-4 gap-8">
        {dataMeters.map(meter => (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200">
            <div className="px-6 py-4">
                <div className="font-bold text-center text-blue-600 mb-2">Medidor {meter.NumeroMedidor}</div>
                <p className="text-gray-700 text-sm font-medium">
                    Cliente: Esteban Quito Lozada
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
                        <p>{new Date(meter.FechaActualizacion).toLocaleTimeString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold p-2">Lectura</p>
                        <p>{meter.Lectura}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold p-2">Total</p>
                        <p>40 Bs.</p>
                    </div>
                </div>
                <div className="text-center p-4 mt-4">
                    <Link href={`/history?id=${meter.Id}`} className="bg-black hover:bg-slate-400 text-white text-sm font-bold py-2 px-4 rounded">
                        VER DEUDAS
                    </Link>
                </div>
            </div>
            <div class="m-2 text-center">
                <button className="bg-transparent hover:bg-black text-black hover:text-white border border-black text-sm font-bold m-2 p-2 rounded">
                    DESHABILITAR
                </button>
                <button className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold m-2 p-2 rounded">
                    HABILITAR
                </button>
            </div>
        </div>
        ))}
    </div>
  );
}

export default CardMeters;