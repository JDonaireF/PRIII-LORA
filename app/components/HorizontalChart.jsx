import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var options = {
    indexAxis: 'y',
    responsive : true,
    plugins : {
        legend : {
            display : true,
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'DEUDAS PAGADAS Y PENDIENTES POR MES'
          }
    },
    scales : {
        y : {
            min : 0,
            max : 200
        },
        x: {
            ticks: { color: 'rgba(100, 100, 100)'},
            min : 0,
            max: 10
        }
    }
};

export default function HorizontalBarChart() {
    const [chartData, setChartData] = useState({
        labels: ["", "", ""],
        datasets: [
          {
            label: 'Pagadas',
            data: [100.5, 100.18, 80.75],
            backgroundColor: 'rgba(72, 194, 178, 0.8)',
            borderWidth: 1
          },
          {
            label: 'Pendientes',
            data: [100.5, 100.18, 80.75],
            backgroundColor: 'rgba(250, 239, 145, 0.8)',
            borderWidth: 1
          },
        ],
      });

      useEffect(() => {
        const fetchData = async () => {
            try {
              const [monthResponse, debtResponse] = await Promise.all([
                fetch("http://localhost:3000/api/reports/getMonthByZone"),
                fetch("http://localhost:3000/api/reports/getPaidUnpaid")
              ]);

              const monthData = await monthResponse.json();
              const debtData = await debtResponse.json();

              const arrayMonth = monthData.map(item => {
                return new Date(item.FechaRegistro).toLocaleString('es-ES', { month: 'long' }).toUpperCase();
              });
              const arrayPaid = debtData.map(item => item.Pagados);
              const arrayUnpaid = debtData.map(item => item.Pendientes);

              setChartData((prevChartData) => ({
                ...prevChartData,
                labels: arrayMonth,
                datasets: [
                  {
                    ...prevChartData.datasets[0],
                    data: arrayPaid,
                  },
                  {
                    ...prevChartData.datasets[1],
                    data: arrayUnpaid,
                  },
                ],
              }));
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          fetchData();

      }, []);
      
    return <Bar data={chartData} options={options}/>
}