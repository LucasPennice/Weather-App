import React, { useContext } from 'react';
import { Context } from './Context';
import './style/App.css';
import BeatLoader from 'react-spinners/BeatLoader';
import CityTemps from './components/primary/CityTemps';
import CityData from './components/primary/CityData';
import HourlyForecast from './components/primary/HourlyForecast';
import DailyForecast from './components/primary/DailyForecast';
import StartingAnimation from './components/secondary/StartingAnimation';
import SearchingBar from './components/primary/SearchingBar';

function App() {
	const { isLoading, errorFromApi, callApiAndUpdateData, currentDayDataContainer, updateCityName, cityName } =
		useContext(Context);

	function handleClick(e) {
		e.preventDefault();
		//buen nombre
		callApiAndUpdateData(cityName);
		document.getElementById('text-input').blur();
	}

	//si bien uncle bob dice que todo deberia ser una funcion cosas asi las
	//podes meter inline si no entorpecen mucho la vista
	function setBackground() {
		return isTemperatureWarm() ? 'warm' : 'cold';
	}

	function isTemperatureWarm() {
		//que es 16? podes armarte una variable toda en mayuscula que explique que es
		//por ejemplo, const COLD_WEATHER_THRESHOLD = 16
		return isLoading === false && currentDayDataContainer.actualTemp > 16;
	}

	function displayLoader() {
		return (
			<div className='loader-container'>
				<BeatLoader color='rgba(255, 255, 255, 0.8)' size={20} />
			</div>
		);
	}

	function displayPrimaryComponents() {
		return (
			<div className='container'>
				<CityTemps />
				<CityData />
				<HourlyForecast />
				<DailyForecast />
			</div>
		);
	}

	function displayError() {
		return <h1 className='error'>{errorFromApi.message}</h1>;
	}

	return (
		<div className={`App ${setBackground()}`}>
			<StartingAnimation />

			<SearchingBar cityName={cityName} updateCityName={updateCityName} handleClick={handleClick} />
			{/* No es recomendable tener operadores ternarios uno adentro del otro, solo usalos cuando realmente tengas dos 
    posibles outcomes, lo que podes hacer es tener retornos preventivos por ejemplo digamos que te armas
    la funcion renderAppContent*/}
			{errorFromApi.state ? displayError() : isLoading ? displayLoader() : displayPrimaryComponents()}
		</div>
	);
}

// const renderAppContent = () => {
//   if (errorFromApi.state) return displayError()
//   if (isLoading) return displayLoader()
//   return displayPrimaryComponents();
// }
// de esta manera vos sabes que si hay un retorno vos sabes que todas las condiciones
// de arriba ya se cumplieron, sino hubiera retornado eso, se llama guard clause
// el concepto, te recomiendo que lo investigues, super copado

export default App;
