let appId = 'ecb0789853e1e86147135a7f0424309b';
let units = 'metric';
let searchMethod;

// Zipcode only work for US atm or I need to ask for the country and accept more than 5 numbers
// https://openweathermap.org/current#one
function getSearchMethod(searchTerm) {
	if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
		searchMethod = 'zip';
	}
	else {
		searchMethod = 'q';
	}
}

function searchWeather(searchTerm) {
	getSearchMethod(searchTerm);
	fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
		return result.json();
	}).then(result => {
		init(result);
	})
}

function init(resultFromServer) {
	let temperatureElement = document.getElementById('temperature');
	let humidityElement = document.getElementById('humidity');
	let cityHeader = document.getElementById('city-header');
	let weatherIcon = document.getElementById('documentIconImg');

	weatherIcon.src = 'https://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

	temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + ' &#176C';
	cityHeader.innerHTML = resultFromServer.name;
	humidityElement.innerHTML = 'Humidity ' + resultFromServer.main.humidity + '%';
}

/* Event Listener for click on + btn */
document.getElementById('searchBtn').addEventListener('click', () => {
	let searchTerm = document.getElementById('searchInput').value;
	if(searchTerm) {
		searchWeather(searchTerm);
		storeCity(searchTerm);
	}
});

/* Event Listener for enter key on input */
const node = document.getElementById('searchInput');
node.addEventListener('keyup', function(e){
	if(e.key === 'Enter'){
		let searchTerm = node.value;
		if(searchTerm){
			searchWeather(searchTerm);
			storeCity(searchTerm);
		}
	}
});

/* Local Storage */
function storeCity(searchTerm) {
	localStorage.setItem('place', searchTerm);
}

let place = localStorage.place || 'Montreal';

// Get instance of local storage key/value
const saved = localStorage.getItem('place');

// Check if it exists and if so set HTML to value
if(saved) {
	searchWeather(place);
}