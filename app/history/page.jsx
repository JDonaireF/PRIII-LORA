'use client'
import React from "react";
import { useEffect, useState } from "react";
import TableDebts from "../components/Table";

function History() {
    const [id, setId] = useState([]);

    const [debts, setDebts] = useState([]);

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
    
        if (id) {
          fetch(`http://localhost:3000/api/meters/getHistoryById/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setDebts(data);
            });
        }
    
        setId(id);
      }, []);

    return(
        <div className="m-6 rounded bg-white p-8">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <TableDebts dataDebts={debts}></TableDebts>
            </div>
        </div>
    )
}

export default History;