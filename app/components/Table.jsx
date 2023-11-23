'use client';
import Link from 'next/link';

export default function TableConsume({ dataConsume }) {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Consumo
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Lectura
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Hora
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Fecha
                    </th>
                </tr>
            </thead>
            <tbody>
                {dataConsume.map(consume => (
                    <tr className="bg-white border-b dark:bg-white dark:border-gray-400">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                            {consume.Consumo} W
                        </th>
                        <td className="px-6 py-4">
                            {consume.Lectura}
                        </td>
                        <td className="px-6 py-4">
                            {consume.Costo} Bs.
                        </td>
                        <td className="px-6 py-4">
                            {new Date(consume.FechaRegistro).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4">
                            {new Date(consume.FechaRegistro).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}