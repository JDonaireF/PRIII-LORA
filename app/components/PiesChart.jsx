import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

var options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins : {
      legend : {
        display : true,
        position: 'right'
      },
      title: {
          display: true,
          text: 'PROPORCION MEDIDORES HABILITADOS Y DESHABILITADOS'
        }
  }
};

export default function PieChart() {
  const [chartData, setChartData] = useState({
    labels: ['Habilitados', 'Deshabilitados'],
    datasets: [
      {
        label: 'Medidores',
        data: [12, 19],
        backgroundColor: [
          'rgba(72, 194, 106, 0.5)',
          'rgba(217, 56, 77, 0.5)',
        ],
        borderColor: [
          'rgba(72, 194, 106, 1)',
          'rgba(217, 56, 77, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
          const statusResponse = await fetch("http://localhost:3000/api/reports/getEnabledDisabled");

          const statusData = await statusResponse.json();
          const arrayStatus = Object.values(statusData);

          console.log(arrayStatus);
          setChartData((prevChartData) => ({
            ...prevChartData,
            labels: ['Habilitados', 'Deshabilitados'],
            datasets: [
              {
                ...prevChartData.datasets[0],
                data: arrayStatus,
              },
            ],
          }));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();

  }, []);
  
  return <Pie data={chartData} options={options}/>;
}