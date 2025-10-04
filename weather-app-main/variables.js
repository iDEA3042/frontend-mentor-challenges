let latitude = 52.52;
let longitude = 13.419998;
let city = 'Berlin';	// starting city
let cityIndex = 0;
let country = 'Germany';
let metricUnits = true;	// are metric units active or not
let windSpeedUnit = 'km/h';	// wind speed unit
let precipitationUnit = 'mm';	// global precipitation unit
let unitsString = '';	// parameter string for adjusting unit conversion when fetching data from API

// days, Sunday to Saturday, 0 to 6
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// shortened months
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const returnedCitiesLoader = document.getElementById('returned-cities-loader');
const returnedCitiesContainer = document.getElementById('returned-cities-container');	// list of returned cities under input

const cityBlock = document.getElementsByClassName('city-block')[0];
const feelsLikeTemperatureSpan = document.getElementById('feels-like-temperature');
const humiditySpan = document.getElementById('humidity');
const windSpeedSpan = document.getElementById('wind-speed');
const precipitationSpan = document.getElementById('precipitation');

const hourContainers = document.getElementsByClassName('hour-container');
const dayContainers = document.getElementsByClassName('day-container');

const loadingImg = document.createElement('img');	// loader animation
		loadingImg.setAttribute('src', './assets/images/icon-loading.svg');
		loadingImg.setAttribute('class', 'loading-img');
		loadingImg.classList.add('loading-img')

const loadingSpan = document.createElement('span');	// loader text span
		loadingSpan.textContent = 'Loading...';
		loadingSpan.style.color = 'var(--smoky-white-color)';