'use client';
import Link from 'next/link';

export default function TableDebts({ dataDebts }) {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Lectura FInal
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Consumo Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Costo Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Fecha
                    </th>
                </tr>
            </thead>
            <tbody>
                {dataDebts.map(debt => (
                    <tr className="bg-white border-b dark:bg-white dark:border-gray-400">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                            {debt.Lectura}
                        </th>
                        <td className="px-6 py-4">
                            {debt.Consumo}
                        </td>
                        <td className="px-6 py-4">
                            {debt.CostoTotal} Bs.
                        </td>
                        <td className="px-6 py-4">
                            {new Date(debt.FechaPago).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}