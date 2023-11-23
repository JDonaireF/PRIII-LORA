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
    responsive : true,
    plugins : {
        legend : {
            display : false,
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'PROMEDIO DE CONSUMO POR MES'
          }
    },
    scales : {
        y : {
            min : 0,
            max : 200
        },
        x: {
            ticks: { color: 'rgba(100, 100, 100)'}
        }
    }
};

export default function BarChart() {
    const [chartData, setChartData] = useState({
        labels: ["", "", ""],
        datasets: [
          {
            label: 'Promedio de Consumo',
            data: [100.5, 100.18, 80.75],
            backgroundColor: 'rgba(66, 128, 227, 0.8)',
            borderWidth: 1
          },
        ],
      });

      useEffect(() => {
        const fetchData = async () => {
            try {
              const [monthResponse, averageResponse] = await Promise.all([
                fetch("http://localhost:3000/api/reports/getMonthByZone"),
                fetch("http://localhost:3000/api/reports/getAverageByMonth")
              ]);

              const monthData = await monthResponse.json();
              const averageData = await averageResponse.json();

              const arrayMonth = monthData.map(item => {
                return new Date(item.FechaRegistro).toLocaleString('es-ES', { month: 'long' }).toUpperCase();
              });
              console.log(arrayMonth);
              const arrayAverage = averageData.map(item => item.Promedio);

              setChartData((prevChartData) => ({
                ...prevChartData,
                labels: arrayMonth,
                datasets: [
                  {
                    ...prevChartData.datasets[0],
                    data: arrayAverage,
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