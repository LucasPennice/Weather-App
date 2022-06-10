import React, { useContext } from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Context } from '../Context';

//aca no te puedo decir nada porque yo tambien hago cualquier cosa
//cuando uso una libreria de terceros, bien ahi que hiciste un componente
//si estuvieras queriendo hacer que LineChart sea mas reutilizable podes
//pasarle como props al componente los parametros que la libreria quiere recibir

export default function LineChart() {
	const { hourlyForecastContainer } = useContext(Context);

	const data = {
		labels: hourlyForecastContainer[0],
		datasets: [
			{
				data: hourlyForecastContainer[1],
				backgroundColor: 'rgba(0, 0, 0, 0.1)',
				borderColor: 'rgba(0, 0, 0, 0.3)',
				cubicInterpolationMode: 'monotone',
				fill: true,
				pointStyle: 'circle',
				pointRadius: 5,
				pointBackgroundColor: 'rgb(101, 105, 102)',
				pointBorderColor: 'rgb(101, 105, 102)',
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				ticks: {
					callback: function (val, index) {
						return index % 6 === 0 && index !== 0 ? this.getLabelForValue(val).slice(0, 2).concat(' Hs') : null;
					},
				},
				grid: {
					display: false,
					callback: function (val, index) {
						return index % 6 === 0;
					},
				},
			},
			y: {
				ticks: {
					callback: function (val, index) {
						return index % 3 === 0 && index !== 0 ? this.getLabelForValue(val).concat('°') : null;
					},
				},
				grid: {
					display: false,
				},
			},
		},
	};

	return <Line data={data} options={options} />;
}
