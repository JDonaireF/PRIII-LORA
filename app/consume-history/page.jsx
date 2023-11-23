'use client'
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react";
import Navbar from '../components/Navbar'
import TableConsume from "../components/Table";
import Link from "next/link";

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

export default function History() {
    const [id, setId] = useState(null);
    const [consume, setConsume] = useState([]);
    const { data: session } = useSession();
    const [rate, setRate] = useState({
        rate: "",
    });

    if (session?.user.role === "Cliente") {
        return <div className="flex items-center justify-center">No estas autorizado para ver esta pagina!</div>
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            fetch(`http://localhost:3000/api/meters/getHistoryConsumeById/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setConsume(data);
                });
        }
        setId(id);
    }, []);

    const handleChange = (e) => {
        setRate({
          ...rate,
          [e.target.name]: e.target.value,
        });
      };

    const handleUpdateRate = (event) => {
        event.preventDefault();
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            fetch(`http://localhost:3000/api/meters/updateRateById/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rate),
            })
            .then((response) => {
                if (response.ok) {
                    window.location.reload();
                } else {
                confirm("Error");
                }
            });
        }
        setId(id);
    };

    return (
        <div>
            <Navbar />
            <div className="m-6 rounded bg-white p-8">
                <div className="mb-5 text-gray-500 font-medium">
                    Historial de Consumo
                </div>
                <div className="mb-5">
                    <nav className="flex justify-between" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/meters" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-600">
                                    <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    Medidores
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div class="flex items-center">
                                    <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Consumo</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="flex justify-end">
                        <form method="POST">
                            <div className="flex items-center">
                                <input onChange={handleChange} id="rate" name="rate" className="pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"/>
                                <button onClick={handleUpdateRate} type="submit" className="bg-transparen hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 text-xs font-bold m-2 p-2 rounded">
                                    Actualizar tarifa
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <TableConsume dataConsume={consume}></TableConsume>
                </div>
            </div>
        </div>
    )
}