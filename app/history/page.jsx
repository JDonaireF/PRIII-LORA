'use client'
import React from "react";
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import TableConsume from "../components/Table";
import { useSession } from "next-auth/react"

export default function History() {
    const [id, setId] = useState([]);
    const [consume, setConsume] = useState([]);
    const { data: session } = useSession();

    if (session?.user.role === "Cliente") {
        return <div className="flex items-center justify-center">No estas autorizado para ver esta pagina!</div>
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
          fetch(`http://localhost:3000/api/meters/getHistoryById/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setConsume(data);
            });
        }
        setId(id);
      }, []);

    return(
        <div>
            <Navbar />
            <div className="m-6 rounded bg-white p-8">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <TableConsume dataConsume={consume}></TableConsume>
                </div>
            </div>
        </div>
    )
}