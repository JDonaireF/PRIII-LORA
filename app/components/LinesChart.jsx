import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var options = {
    plugins : {
        legend : {
            display : false,
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'PROMEDIO DE CONSUMO POR MEDIDOR'
          }
    },
    scales: {
        y: {
            min: 0,
        },
        x: {
            ticks: { color: 'rgb(100, 100, 100)' },
        },
    },
};

export default function LineChart() {
    const [chartData, setChartData] = useState({
        labels: ["", "", ""],
        datasets: [
          {
            label: 'Promedio de Consumo',
            data: [100.5, 100.18, 80.75],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 99, 132)',
          },
        ],
      });

      useEffect(() => {
        const fetchData = async () => {
            try {
              const [metersResponse, averageResponse] = await Promise.all([
                fetch("http://localhost:3000/api/reports/getMeterByZone"),
                fetch("http://localhost:3000/api/reports/getAverageByMeter")
              ]);

              const metersData = await metersResponse.json();
              const averageData = await averageResponse.json();

              const arrayMeters = metersData.map(item => item.NumeroMedidor);
              const arrayAverage = averageData.map(item => item.Promedio);

              setChartData((prevChartData) => ({
                ...prevChartData,
                labels: arrayMeters,
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
      
    return <Line data={chartData} options={options}/>
}