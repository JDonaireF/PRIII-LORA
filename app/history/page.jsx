import Link from "next/link";
import React from "react";

function History() {
    return(
        <div className="m-6 rounded bg-white p-8">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                Fecha
                            </th>
                            <th className="py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-white dark:border-gray-400">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                5.2W
                            </th>
                            <td className="px-6 py-4">
                                7831
                            </td>
                            <td className="px-6 py-4">
                                40 Bs.
                            </td>
                            <td className="px-6 py-4">
                                20/08/2023
                            </td>
                            <td className="px-6 py-4">
                            <Link href="/" className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Generar factura
                            </Link>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-white dark:border-gray-400">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                5.2W
                            </th>
                            <td className="px-6 py-4">
                                7831
                            </td>
                            <td className="px-6 py-4">
                                40 Bs.
                            </td>
                            <td className="px-6 py-4">
                                20/08/2023
                            </td>
                            <td className="px-6 py-4">
                            <Link href="/" className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Generar factura
                            </Link>
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-white">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                5.2W
                            </th>
                            <td className="px-6 py-4">
                                7831
                            </td>
                            <td className="px-6 py-4">
                                40 Bs.
                            </td>
                            <td className="px-6 py-4">
                                20/08/2023
                            </td>
                            <td className="px-6 py-4">
                            <Link href="/" className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Generar factura
                            </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default History;