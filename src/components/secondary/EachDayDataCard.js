import React from 'react';

//esto es muy chico para ser un componente me parece, lo podrias meter como una funcion
//{EachDayDataCard()}
//y si tenes varias funciones de este tipo que renderizan cosas pero no son
//lo suficientemente grandes para un componente podes armarte un archivo
//renderModel.jsx y metes todas esas ahi.
// lo mismo para ForecastDay y StartingAnimation

export default function EachDayDataCard({ title, currentNumber, icon }) {
	return (
		<div className='card'>
			{icon}
			<h3 className='title'>{title}</h3>
			<h3 className='number'>{currentNumber}</h3>
		</div>
	);
}
