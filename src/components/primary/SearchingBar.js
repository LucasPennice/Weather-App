import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchingBar(props) {
	return (
		//si bien para el tamaño de la app no esta mal ponerle clase form a algo
		//lo que podes hacer (aparte de tener un archivo sass para cada componente si
		//es que vale la pena), es ponerle por un nombre que hable de en que componente esta
		//el elemento al que le estas poniendo la clase ej: className="SBar_form" porque esta en SearchingBar.jsx
		//ah si tenes react en un archivo js ponele jsx de extension, buena practica
		<form className='form'>
			<input
				id='text-input'
				type='text'
				placeholder='Enter a City Name'
				value={props.cityName}
				onChange={(event) => props.updateCityName(event.target.value)}
				// onChange={props.updateCityName}
				//podes poner el puntero a la funcion directamente, js le pasa el objeto evento a la funcion automaticamente
				//entonces es la declaracion de la funcion deberias escribir
				// function updateCityName(e) {
				//const cityName = e.target.value
				// 	setCityName(cityName);
				// }
			/>
			<button onClick={(e) => props.handleClick(e)}>
				{/* aca lo mismo que arriba */}
				<FaSearch />
			</button>
		</form>
	);
}
