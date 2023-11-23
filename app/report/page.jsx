'use client';
import React from "react";
import Navbar from '../components/Navbar'
import PieChart from "../components/PiesChart";
import LineChart from "../components/LinesChart";
import BarChart from "../components/BarsChart";
import HorizontalBarChart from "../components/HorizontalChart";

export default function Report() {

  return (
    <div>
      <Navbar />
      <div className="m-6 rounded bg-white p-8">
        <div className="mb-2 text-gray-500 font-medium">
          {/* Zona: {session.user?.zone} */}
        </div>
        <div className="flex text-gray-600 font-semibold justify-center">
          REPORTES
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
            <div className="border-2 border-blue-500 p-10 rounded-lg">
              <PieChart/>
            </div>
            <div className="border-2 border-blue-500 p-10 rounded-lg">
              <LineChart/>
            </div>
            <div className="border-2 border-blue-500 p-10 rounded-lg">
              <BarChart/>
            </div>
            <div className="border-2 border-blue-500 p-10 rounded-lg">
              <HorizontalBarChart/>
            </div>
        </div>
      </div>
    </div>
  )
}