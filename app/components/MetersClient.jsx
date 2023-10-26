import Link from 'next/link';

function CardMetersClient({ dataMeters }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        {dataMeters.map((meter) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200" key={meter.Id}>
            {/* <p className="font-bold text-black mb-2">Zona: {meter.Zona},{meter.Id}</p> */}
            <p className="font-bold text-black mb-2">{meter.NumeroMedidor}</p>

            <div key={meter.Id} className="px-6 py-4">
              <div className="font-bold text-center text-blue-600 mb-2">
                {new Date(meter.FechaActualizacion).toLocaleString('es-ES', { month: 'long' })}
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </div>

            <div className="rounded bg-white mx-4 p-2 text-sm">
              <div className="grid grid-cols-2 gap-8 mt-6">
                <div className="text-center">
                  <p className="font-bold p-2">Consumo</p>
                  <p>{meter.Consumo} W</p>
                </div>
                <div className="text-center">
                  <p className="font-bold p-2">Hora/Registro</p>
                  <p>
                    {new Date(meter.FechaActualizacion).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-bold p-2">Lectura</p>
                  <p>{meter.Lectura}</p>
                </div>
                <div className="text-center">
                  <p className="font-bold p-2">Total</p>
                  <p>{(meter.Consumo * meter.CostoReal).toFixed(2)}</p>
                </div>
              </div>

              <div className="text-center p-4 mt-4">
              <Link href={`/invoicedetail?id=${meter.Id}`} className="bg-black hover:bg-slate-400 text-white text-sm font-bold py-2 px-4 rounded">
         VER DETALLES
</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardMetersClient;
