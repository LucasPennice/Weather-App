import axios from 'axios';

const API_BASE = 'https://api.weatherapi.com/v1/forecast.json';
const API_KEY = '86f5c8bf793c454fad4130221220505';

export async function apiCall(city) {
	const url = `${API_BASE}?key=${API_KEY}&q=${city}&days=3&aqi=no`;
	const apiResponse = await axios.get(url);

	return apiResponse.data;
}
