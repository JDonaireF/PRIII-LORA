'use client'
import React from "react";
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import { useSession } from "next-auth/react"
import TableDebts from "../components/TableDebt";
import Link from "next/link";

export default function History() {
    const [id, setId] = useState([]);
    const [debts, setDebts] = useState([]);
    const { data: session } = useSession();

    if (session?.user.role === "Cliente") {
        return <div className="flex items-center justify-center">No estas autorizado para ver esta pagina!</div>
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
          fetch(`http://localhost:3000/api/meters/getUnpaidDebtById/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setDebts(data);
            });
        }
        setId(id);
      }, []);

    return(
        <div>
            <Navbar />
            <div className="m-6 rounded bg-white p-8">
            <div className="mb-5 text-gray-500 font-medium">
                    Deudas Pendientes
                </div>
                <div className="mb-5">
                    <nav className="flex justify-between" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                            <Link href="/meters" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-600">
                                <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                </svg>
                                Medidores
                            </Link>
                            </li>
                            <li aria-current="page">
                            <div class="flex items-center">
                                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Deudas</span>
                            </div>
                            </li>
                        </ol>
                        <div className="flex items-center">
                            <Link href={`/debts?id=${id}`} className="text-sm font-medium text-gray-400">Pagadas</Link>
                            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </div>
                    </nav>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <TableDebts dataDebts={debts}></TableDebts>
                </div>
            </div>
        </div>
    )
}