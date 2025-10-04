document.addEventListener('weatherDataReady', (event) => {  // custom event received
    
    const weatherData = {

        // all useful weather data fetched from the API
        city: city,
        country: country,
        cityTime: event.detail.data.current.time,
        mainWeatherCode: event.detail.data.current.weather_code,
        mainTemp: event.detail.data.current.temperature_2m,
        feelsLike: event.detail.data.current.apparent_temperature,
        humidity: event.detail.data.current.relative_humidity_2m,
        windSpeed: event.detail.data.current.wind_speed_10m,
        precipitation: event.detail.data.current.precipitation,
        hourlyWeatherCode: event.detail.data.hourly.weather_code,
        hourlyTemp: event.detail.data.hourly.temperature_2m,
        time: event.detail.data.hourly.time,
        dailyWeatherCode: event.detail.data.daily.weather_code,
        maxTemps: event.detail.data.daily.temperature_2m_max,
        minTemps: event.detail.data.daily.temperature_2m_min
    };

    window.globalWeatherData = weatherData;

    const dateObject = new Date(weatherData.cityTime);  // date object created from current city time for timing and dating purposes
    const dayOfWeek = dateObject.getDay();
    const monthOfYear = dateObject.getMonth();
    const dayOfMonth = dateObject.getDate();
    const year = dateObject.getFullYear();

    function hideSkeletons() {

        loadingImg.remove();    // hide loader animation
        loadingSpan.remove();   // hide loader span
        
        cityBlock.classList.add('city-block');  // add original css class
        cityBlock.classList.remove('city-block-loading');   // remove loader class

        for (let i = 0; i < cityBlock.children.length; i++) {   // loop through city block's children...

		    cityBlock.children[i].style.display = 'flex';   // ...and show them
        }

        for (let i = 0; i < hourContainers.length; i++) {   // loop through all hour containers...
            
            for (let j = 0; j < hourContainers[i].children.length; j++) {   // ..and all of their children...
                
                hourContainers[i].children[j].style.visibility = 'visible'; // ...and show them
            }
        }
        
        for (let i = 0; i < dayContainers.length; i++) {    // loop through all day containers...

            for (let j = 0; j < dayContainers[i].children.length; j++) {    // ...and all of their children...

                dayContainers[i].children[j].style.display = 'flex';    // ...and show them
            }
		}
	
    }
    hideSkeletons();

    function determineWeatherIcon(element, weatherCode) {
        
        switch (true) {

            case [0, 1].includes(weatherCode):
                element.src = './assets/images/icon-sunny.webp';
                element.alt = 'Clear skies'
                break;
            case [2].includes(weatherCode): 
                element.src = './assets/images/icon-partly-cloudy.webp';
                element.alt = 'Partly cloudy'
                break;
            case [3].includes(weatherCode):
                element.src = './assets/images/icon-overcast.webp';
                element.alt = 'Overcast clouds'
                break;
            case [45, 48].includes(weatherCode):
                element.src = './assets/images/icon-fog.webp';
                element.alt = 'Foggy weather'
                break;
            case [51, 53, 55, 56, 57].includes(weatherCode):
                element.src = './assets/images/icon-drizzle.webp';
                element.alt = 'Drizzly weather'
                break;
            case [61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode):
                element.src = './assets/images/icon-rain.webp';
                element.alt = 'Rainy weather'
                break;
            case [71, 73, 75, 77, 85, 86].includes(weatherCode):
                element.src = './assets/images/icon-snow.webp';
                element.alt = 'Snowy weather'
                break;
            case [95, 96, 99].includes(weatherCode):
                element.src = './assets/images/icon-storm.webp';
                element.alt = 'Stormy weather'
                break;
        }
    }
    
    function currentWeather() {

        const cityCountrySpan = document.getElementById('city-country');
        const dayDateYearSpan = document.getElementById('day-date-year');
        const mainWeatherIcon = document.getElementById('current-weather-img');
        const mainTemperatureSpan = document.getElementById('main-temperature');

        // adjust corresponding span elements in html with fresh data
        cityCountrySpan.textContent = `${weatherData.city}, ${weatherData.country}`;
        dayDateYearSpan.textContent = `${days[dayOfWeek]}, ${months[monthOfYear]} ${dayOfMonth}, ${year}`;
        determineWeatherIcon(mainWeatherIcon, weatherData.mainWeatherCode);
        mainTemperatureSpan.textContent = weatherData.mainTemp + '°';
        feelsLikeTemperatureSpan.textContent = weatherData.feelsLike + '°';
        humiditySpan.textContent = weatherData.humidity + '%';
        windSpeedSpan.textContent = weatherData.windSpeed + windSpeedUnit;
        precipitationSpan.textContent = weatherData.precipitation + precipitationUnit;
    }
    currentWeather();

    function dailyWeather() {

        const dynamicDays = []; // dynamic week, with the position of days shifting every new day
        for (let i = 0; i < weatherData.time.length; i += 24) {
            
            dynamicDays.push(days[new Date(weatherData.time[i]).getDay()]); // returns an int corresponding to a certain day in days array from variables.js, pushes that day to dynamicDays
        }

        const hourlyForecastSelect = document.getElementById('hourly-forecast-select');
        for (let i = 0; i < hourlyForecastSelect.children.length; i++) {   // loops through hourly forecast options

            hourlyForecastSelect.children[i].value = String(i);  // gives all options in hourly forecast a specific index that corresponds to weatherData.daily.time indexes of next 7 days
            hourlyForecastSelect.children[i].selected = (i === 0);  // reset active option to the first one
            hourlyForecastSelect.children[i].textContent = dynamicDays[i];  // dynamic naming of options
        }

        const daySpans = document.getElementsByClassName('day-span');
        const dayWeatherIcons = document.getElementsByClassName('daily-weather-icon');
        const maxTemperatureSpans = document.getElementsByClassName('max-temperature');
        const minTemperatureSpans = document.getElementsByClassName('min-temperature');
        for (let i = 0; i < daySpans.length; i++) { // loops through daily forecast span elements
            
            daySpans[i].textContent = dynamicDays[i].slice(0, 3);   // dynamic naming with first 3 letters of a day
            determineWeatherIcon(dayWeatherIcons[i], weatherData.dailyWeatherCode[i]);  // dynamic weather icon adjusting
            maxTemperatureSpans[i].textContent = weatherData.maxTemps[i] + '°'; // max temp for that day
            minTemperatureSpans[i].textContent = weatherData.minTemps[i] + '°'; // min temp for that day
        }

        hourlyForecastSelect.addEventListener('change', (event) => {    // when an option is clicked
            //let dynamicWeather = [];    // declare an array for purpose of retrieving hourly forecast temps
            
            let iterator;  // local iterator for iterating through weatherDaty.hourly temps
            let limit;  // local limit for determining when to stop iterating, and retrieve temps for that day
            switch (event.target.value) {   // switches option values declaring before
                case '0':   // first option
                    iterator = 0;  // first hour of day
                    limit = 24; // last hour of day
                    break;
                case '1':   // second option, and so on...
                    iterator = 24;
                    limit = 48;
                    break;
                case '2':
                    iterator = 48;
                    limit = 72;
                    break;
                case '3':
                    iterator = 72;
                    limit = 96;
                    break;
                case '4':
                    iterator = 92;
                    limit = 116;
                    break;
                case '5':
                    iterator = 116;
                    limit = 140;
                    break;
                case '6':
                    iterator = 140;
                    limit = 164;
                    break;
            }

            hourlyWeather(iterator, limit)
        })
    }
    dailyWeather();

    function hourlyWeather(iterator, limit) {

        dynamicWeather = [];
        dynamicWeatherCodes = [];
        for (i = iterator; i < limit; i++) {
                
            dynamicWeather.push(weatherData.hourlyTemp[i]); // loads dynamicWeather array with hourly temps for certain day
            dynamicWeatherCodes.push(weatherData.hourlyWeatherCode[i]);
        }

        const dynamicHours = [];
        const hourTimeSpans = document.getElementsByClassName('hour-time');
        const hourWeatherIcons = document.getElementsByClassName('hourly-weather-icon');
        const hourTemperatureSpans = document.getElementsByClassName('hour-temperature');
        for (j = 0; j < 24; j++) {  // separate loop for startup because the prior one is too specific
            
            dynamicHours.push(new Date(weatherData.time[j]).getHours());    // retrieves hours in a day
            
            let timeSuffix;
            if (j < 12) {   // anno meridian
                timeSuffix = 'AM';
            } else {    // post meridian
                timeSuffix = 'PM';
            }
            
            hourTimeSpans[j].textContent = `${dynamicHours[j]} ${timeSuffix}`;  // adjusts data in hour time span elements, corresponding to the hour and suffix
            determineWeatherIcon(hourWeatherIcons[j], dynamicWeatherCodes[j]);
            hourTemperatureSpans[j].textContent = dynamicWeather[j] + '°';  // adjusts data in hour temp span elements
        }
    }
    hourlyWeather(0, 24);   // on page load, current day
})