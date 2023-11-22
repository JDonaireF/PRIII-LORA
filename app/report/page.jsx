'use client';
import React from "react";
import Navbar from '../components/Navbar'
import PieChart from "../components/PieChart";
import LinesChart from "../components/LineChart";


export default function Report() {

  return (
    <div>
      <Navbar />
      <div className="m-6 rounded bg-white p-8">
        <div className="mb-2 text-gray-500 font-medium">
          {/* Zona: {session.user?.zone} */}
        </div>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
            <div>
                <PieChart></PieChart>
            </div>
            <div>
                <LinesChart></LinesChart>
            </div>
        </div>
      </div>
    </div>
  )
}