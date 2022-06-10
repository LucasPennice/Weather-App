import React, { useEffect, useState } from 'react';
import { apiCall } from './api/weatherApi';

//importalo arriba chanta xd
const Context = React.createContext();

const API_BASE = 'https://api.weatherapi.com/v1/forecast.json';
const API_KEY = '86f5c8bf793c454fad4130221220505';

//Si te pintaba (totalmente opcional) podrias haber deconstruido las props como
//const {children} = props;
//o directamente como
//function ContextProvider({children}) {

function ContextProvider(props) {
	const [cityName, setCityName] = useState('');
	const [currentDayDataContainer, setCurrentDayDataContainer] = useState({});
	const [hourlyForecastContainer, setHourlyForecastContainer] = useState({});
	const [forecastDayContainer, setForecastDayContainer] = useState({});
	//Siempre que puedas agrupar estado para tener menos variables esta bueno
	//pero no estoy seguro en este caso. Ponele que estuvieras haciendo un formulario
	//entonces todos los estados que manejan los inputs estarian en un estado tipo
	//const [formData,setFormData] = useState(defaltFormValue)
	//y cuando queres modificar algo escribis tipo setFormData(replaceElementByKey(formData,"nombre",value))
	//la funcion replaceElementByKey retorna un objeto nuevo y eso es lo que le asoias a setFormData

	const [isLoading, setIsLoading] = useState(true);
	const [errorFromApi, setErrorFromApi] = useState({ state: false, message: '' });
	//aca fijate que tenes state y message, no esta mal pero como message="" es falsey, osea si tenes if(message){}else{}
	//cae al else. Entonces no es estrictamente necesario tener esa variable ya que la podrías calcular a partir
	//de un estado que ya tenes, si quisieras hacer eso pondrias (const isError = message === true) o directamente cuando vas
	//a renderizar el mensaje podes hacer {message && <>Tu mensaje</>}. El && es como un operador ternario
	//pero solo cuando queres devolver cosas en el true

	async function getApiData(city) {
		//si hubieras tenido un estado que se fije si todavia no tenes la info de la api
		//harias tipo
		//setLoading(true)
		try {
			const result = await apiCall(city);
			return result;
		} catch (err) {
			//esta bueno tener un console.error para hacer debugs
			//console.error(err)
			setErrorFromApi({ state: true, message: err.message });
		}
		// finally {
		//   setLoading(false)
		// }

		//el finally corre despues del try/catch independientemente de si hubo error o no
	}

	//Si bien por el tamaño de la app probablemente esta bien el nombre de esta funcion
	//estaria bueno que tenga un nombre autoexplicativo, no siempre es posible/facil igual
	//ponele aca podria ser resetStateToDefaultValues() o resetState() directamente
	function setSates() {
		setIsLoading(true);
		setCityName('');
		setErrorFromApi({ state: false, message: '' });
	}

	//fijate que tu funcion se llama resetState pero el estado default de isLoading es true
	function resetStates() {
		setIsLoading(false);
		setCityName('');
	}

	//updateWeatherData sería un nombre mas preciso
	function fillDataWeNeedWithApiResponse(apiData) {
		const current = apiData.current;
		const location = apiData.location;
		const forecast = apiData.forecast.forecastday;

		//updateCurrentDayData sería un nombre mas preciso, los mismo para las otras dos
		fillCurrentDayData(current, location, forecast);
		fillDailyForecastData(forecast);
		fillCurrentHourlyForecast(forecast);
	}

	function fillCurrentDayData(current, location, forecast) {
		setCurrentDayDataContainer({
			last_updated: current.last_updated,
			city: location.name,
			country: location.country,
			actualTemp: current.temp_c,
			howIsWeather: current.condition.text,
			iconUrl: current.condition.icon,
			humidity: current.humidity,
			clouds: current.cloud,
			min: forecast[0].day.mintemp_c,
			max: forecast[0].day.maxtemp_c,
			visibility: current.vis_km,
		});
	}

	function fillDailyForecastData(forecast) {
		//aca podrias tener unas variables que hagan que tu codigo se lea mucho mejor
		//ej
		//const TOMORROW = 1
		//const DAY_AFTER_TOMORROW = 2 ...sorprendentemente no tienen una palabra para pasado mañana los ingleses
		setForecastDayContainer(
			[
				//entonces llamarias a getForecastDayData() como
				//	getForecastDayData(forecast, TOMORROW),
				//	getForecastDayData(forecast, DAY_AFTER_TOMORROW),
				getForecastDayData(forecast, 1), // Tomorrow
				getForecastDayData(forecast, 2),
			] // After tomorrow
		);
	}

	function getForecastDayData(forecast, numberOfDay) {
		//no esta mal para nada esto, pero esta es otra manera de hacerlo
		//const minTemp = forecast[numberOfDay].day.mintemp_c,
		//const maxTemp: forecast[numberOfDay].day.maxtemp_c,
		//const weatherIcon: forecast[numberOfDay].day.condition.icon,
		//entonces haces return {minTemp,maxTemp,weatherIcon} que seria lo mismo que escribir
		// return {minTemp:minTemp,maxTemp:maxTemp,weatherIcon:weatherIcon}
		return {
			minTemp: forecast[numberOfDay].day.mintemp_c,
			maxTemp: forecast[numberOfDay].day.maxtemp_c,
			weatherIcon: forecast[numberOfDay].day.condition.icon,
		};
	}

	function fillCurrentHourlyForecast(forecast) {
		//forecast[0] asumo que es la info del clima de hoy
		//capaz la podes llamar const todaysWeather = forecast[0]
		// y vas tirando info de que serian las variables

		//no esta mal esto, es medio rara la estructura nomas,podrias haber guardado
		//un array de objetos que tengan keys hora,temperatura, la funcion te quedaria tipo asi
		// const currentDayWeatherByHour = forecast[0].hour o algun nombre asi
		// const hourlyData = currentDayWeatherByHour.map(item => {
		//   const {time,temp_c} = item
		//   return { hour: time.slice(-5), temp: temp_c }
		// })
		const eachHour = forecast[0].hour.map((item) => item.time.slice(-5));
		const tempForEachHour = forecast[0].hour.map((item) => item.temp_c);
		const hourlyData = [eachHour, tempForEachHour];
		setHourlyForecastContainer(hourlyData);
	}

	function updateCityName(name) {
		setCityName(name);
	}

	// HEAD FUNCTION

	async function callApiAndUpdateData(city) {
		//me gusta la estructura de la función, tener la estructura tipo:
		//resultado1 = funcion()
		//resultado2 = funcion(resultado1)
		//se llama pipeline, esta re bien tenerlo asi, el tema es que generalmente tenes que hacer muchas funciones
		//esto no es un problema pero tenes que empezar a armar subcarpetas/otros archivos (model.js es un nombre estandar
		//para archivos que contienen logica)
		setSates();
		//fijate que setStates es medio general
		const apiData = await getApiData(city);
		fillDataWeNeedWithApiResponse(apiData);
		resetStates();
	}

	// END HEAD FUNCTION

	function getUserLocationAndUpdateData() {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				//esta bueno armarte un hook custom cuando queres hacer llamados a api's, despues te
				//paso el codigo de uno, pero la interfaz te quedaria algo como
				//const {data,loading,error}=useFetch(url), y como data,loading y error son variables
				//de estado podes derivar estado de ellos
				callApiAndUpdateData(`${latitude},${longitude}`);
			},
			showIfgeolocationError,
			{ timeout: 10000 }
		);
	}

	function showIfgeolocationError(err) {
		if (err.code == err.TIMEOUT) alert('Waiting time has been exceeded');
		if (err.code == err.PERMISSION_DENIED) alert('El usuario no permitió informar su posición');
		if (err.code == err.POSITION_UNAVAILABLE) alert('El dispositivo no pudo recuperar la posición actual');
	}

	useEffect(() => {
		//time out to wait the intro animation ends

		setTimeout(() => {
			getUserLocationAndUpdateData();
		}, 1000);
	}, []);

	return (
		<Context.Provider
			//aca podes armar un objeto para pasar las cosas mas facil, tipo const appData = {isLoading,erroFromApi....}
			//value={appData}
			//y lo deconstruis del otro lado, y fijate que tu context tenga un nombre mas explicativo
			//Context.Provider -> AppData.Provider por ejemplo
			value={{
				isLoading,
				errorFromApi,
				currentDayDataContainer,
				hourlyForecastContainer,
				forecastDayContainer,
				cityName,
				updateCityName,
				callApiAndUpdateData,
			}}>
			{props.children}
		</Context.Provider>
	);
}

export { ContextProvider, Context };
