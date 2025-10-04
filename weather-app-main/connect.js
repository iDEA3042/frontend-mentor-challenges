document.addEventListener('DOMContentLoaded', () => {

	// on document load, activate skeletons until data is fetched
	loadSkeletons();
	// fetch data with 'Berlin' as starting city and no imperial units parameters
	getWeather(latitude, longitude, '');
})

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keypress', (event) => {

	if (event.key == 'Enter') {

		if (searchInput.value !== '') {	// if input field is not empty

			searchButton.click();
	}	
	}
})

const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {

	if (searchInput.value !== '') {	// if input field is not empty

		returnedCitiesLoader.style.display = 'flex';
		returnedCitiesLoader.append(loadingImg, loadingSpan);
		
		city = searchInput.value.toLowerCase()	// edit global city variable
		
		retrieveCities(city);
	}
})

async function retrieveCities(input) {

	const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(input)}&count=4&language=en&format=json`; 	// geoURL for purpose of determining city's latitude and longitude

	try {

		if (document.getElementsByClassName('no-search-result-heading')[0]) {

			document.getElementsByClassName('no-search-result-heading')[0].remove();
		}
		
		const response = await fetch(geoURL);
		const data = await response.json();
		returnedCitiesLoader.style.display = 'none';
		returnedCitiesContainer.style.display = 'flex';	// show returned cities list
		console.log('City data: ', data)

		const returnedCitiesButtons = document.getElementsByClassName('returned-city-button');
		for (let i = 0; i < returnedCitiesButtons.length; i++) {

			returnedCitiesButtons[i].textContent = `${data.results[i].name}, ${data.results[i].admin1}, ${data.results[i].country}`;

			returnedCitiesButtons[i].onclick = (event) => {

				getCityCoordinates(event, data)
			}
		}

	} catch (error) {

		if (error.message === 'Cannot read properties of undefined (reading \'0\')') {

			returnedCitiesContainer.style.display = 'none';
			document.getElementsByTagName('section')[1].style.display = 'none';

			const errorResultMessage = document.createElement('h2');
			errorResultMessage.classList.add('no-search-result-heading');
			errorResultMessage.textContent = 'No search results found!';

			document.body.append(errorResultMessage);
		}

		console.error(error);
	}
}

function loadSkeletons() {
	
	// load skeleton elements while fetching API data
	feelsLikeTemperatureSpan.textContent = '-';
	humiditySpan.textContent = '-';
	windSpeedSpan.textContent = '-';
	precipitationSpan.textContent = '-';

	for (let i = 0; i < cityBlock.children.length; i++) {	// hide city block children

		cityBlock.children[i].style.display = 'none';
	}
	cityBlock.classList.remove('city-block');	// remove original one
	cityBlock.classList.add('city-block-loading');	// add new class

	loadingImg.style.display = 'flex';
	loadingSpan.style.display = 'flex';
	cityBlock.append(loadingImg, loadingSpan);	// append loader animation and text

	for (let i = 0; i < hourContainers.length; i++) {	// hide hour containers and children
		
		for (let j = 0; j < hourContainers[i].children.length; j++) {
			
			hourContainers[i].children[j].style.visibility = 'hidden';
		}
	}
	
	for (let i = 0; i < dayContainers.length; i++) {	// hide day containers and children

		for (let j = 0; j < dayContainers[i].children.length; j++) {

			dayContainers[i].children[j].style.display = 'none';
		}
	}
}

function getCityCoordinates(event, data) {	// function for getting city latitude and longitude

	cityIndex = Number(event.target.value);
	latitude = data.results[cityIndex].latitude;
	longitude = data.results[cityIndex].longitude;
	console.log(latitude, longitude)
	city = data.results[cityIndex].name;
	country = data.results[cityIndex].country;
	
	getWeather(latitude, longitude, unitsString)	// main function for fetching weather data
}

async function getWeather(lat, lon, units) {

	const sections = document.getElementsByTagName('section')
		for (let i = 0; i < sections.length; i++) {
			
			sections[0].style.display = 'flex';
			sections[1].style.display = 'grid';
		}

	if (document.getElementsByClassName('network-error-container')[0]) {

		document.getElementsByClassName('network-error-container')[0].remove();
	}

	returnedCitiesContainer.style.display = 'none';	// hide list of returned cities
	searchInput.value = '';	// reset input value

	if (metricUnits) {	// if metric units are active, default setting

		unitsString = '';
	} else if (metricUnits == false) {	// if not, then fetch with all imperial parameters

		unitsString = '&wind_speed_unit=mph&precipitation_unit=inch&temperature_unit=fahrenheit';
	} else if (metricUnits == null) {	// else disable it and use custom/mixed unit settings

		unitsString = unitsString;
	}

	// API connection
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&timezone=auto${units}`;	// 'units' is unitsString as parameters
	
	try {
		
		loadSkeletons();	// activate skeletons until data is fetched
	
		const response = await fetch(url);
		const data = await response.json();

		console.log('Weather data: ', data)
		// creates a custom event
		const weatherReceivedEvent = new CustomEvent('weatherDataReady', {detail: {
																			data,
																		}});
		// sends out a custom event when data is fetched with specific info (as an object)
		document.dispatchEvent(weatherReceivedEvent)

	} catch (error) {

		if (error.message === 'Failed to fetch') {
			
			const sections = document.getElementsByTagName('section')
			for (let i = 0; i < sections.length; i++) {
				
				sections[i].style.display = 'none';
			}

			if (!document.getElementsByClassName('network-error-container')[0]) {

				const networkErrorContainer = document.createElement('div');
				networkErrorContainer.classList.add('network-error-container');

				const networkErrorImage = document.createElement('img');
				networkErrorImage.src = './assets/images/icon-error.svg';

				const networkErrorHeading = document.createElement('h2');
				networkErrorHeading.textContent = 'Something went wrong';

				const networkErrorMessage = document.createElement('p');
				networkErrorMessage.textContent = 'We couldn\'t connect to the server (API error). Please try again in a few moments.';

				const networkErrorButtonIcon = document.createElement('img');
				networkErrorButtonIcon.src = './assets/images/icon-retry.svg';

				const networkErrorButton = document.createElement('button');
				networkErrorButton.innerHTML = networkErrorButtonIcon.outerHTML + 'Retry';
				networkErrorButton.addEventListener('click', () => {

					getWeather(lat, lon, unitsString);
				});

				networkErrorContainer.append(networkErrorImage, networkErrorHeading, networkErrorMessage, networkErrorButton);

				document.body.append(networkErrorContainer);
			}

			console.error("Error fetching weather data:", error);
		}
	}
}