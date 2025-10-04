const changeUnitsButton = document.getElementById('change-units-button');
changeUnitsButton.addEventListener('click', changeUnits);

function changeUnits() {

    if (changeUnitsButton.textContent == 'Switch to imperial') {

        metricUnits = false;
        unitsString = '&wind_speed_unit=mph&precipitation_unit=inch&temperature_unit=fahrenheit';   // all imperial parameters
        getWeather(latitude, longitude, unitsString);
        
        changeUnitsButton.textContent = 'Switch to metric';

        windSpeedUnit = 'mph';  // global wind speed variable
        precipitationUnit = 'in';   // global precipitation unit variable

        fahrenheitButton.classList.add('units-button-active');  // switch active buttons to imperial buttons...
        fahrenheitButton.children[1].style.display = 'block';   // show the checkmark image...
        
        celsiusButton.classList.remove('units-button-active');
        celsiusButton.children[1].style.display = 'none';

        mphButton.classList.add('units-button-active');
        mphButton.children[1].style.display = 'block';
        
        kmhButton.classList.remove('units-button-active');
        kmhButton.children[1].style.display = 'none';

        inchesButton.classList.add('units-button-active');
        inchesButton.children[1].style.display = 'block';
        
        millimetersButton.classList.remove('units-button-active');
        millimetersButton.children[1].style.display = 'none';
    } else {

        // vice versa
        metricUnits = true;
        unitsString = '';
        getWeather(latitude, longitude, unitsString);

        changeUnitsButton.textContent = 'Switch to imperial';

        windSpeedUnit = 'km/h';
        precipitationUnit = 'mm';

        celsiusButton.classList.add('units-button-active');
        celsiusButton.children[1].style.display = 'block';
        
        fahrenheitButton.classList.remove('units-button-active');
        fahrenheitButton.children[1].style.display = 'none';

        kmhButton.classList.add('units-button-active');
        kmhButton.children[1].style.display = 'block';
        
        mphButton.classList.remove('units-button-active');
        mphButton.children[1].style.display = 'none';

        millimetersButton.classList.add('units-button-active');
        millimetersButton.children[1].style.display = 'block';
        
        inchesButton.classList.remove('units-button-active');
        inchesButton.children[1].style.display = 'none';

    }
}

const celsiusButton = document.getElementById('celsius-button');
const fahrenheitButton = document.getElementById('fahrenheit-button');
const kmhButton = document.getElementById('kmh-button');
const mphButton = document.getElementById('mph-button');
const millimetersButton = document.getElementById('millimeters-button');
const inchesButton = document.getElementById('inches-button');
function changeUnit(event) {

    metricUnits = null; // disables total conversion of units

    if (event.target.textContent.includes('Celsius')) { // checks which unit button was clicked using event.target 

        if (unitsString.includes('fahrenheit')) {   // if imperial parameter is active

            unitsString = unitsString.replace('&temperature_unit=fahrenheit', '')   // ...remove it from API link
        }

        celsiusButton.classList.add('units-button-active'); // make celsius button active
        celsiusButton.children[1].style.display = 'block';  // make checkmark image display
        
        fahrenheitButton.classList.remove('units-button-active');   // make fahrenheit button unactive
        fahrenheitButton.children[1].style.display = 'none';    // hide checkmark image

    } else if (event.target.textContent.includes('Fahrenheit')) {

        if (!unitsString.includes('fahrenheit')) {  // if imperial parameter is not active...

            unitsString = unitsString + '&temperature_unit=fahrenheit'; // add it to API link; activate it

            if (unitsString.includes('fahrenheit') && unitsString.includes('mph') && unitsString.includes('inch')) {
                // if all imperial parameters are active, enable total conversion again
                changeUnitsButton.textContent = 'Switch to metric';
            }
        } else {
            unitsString = unitsString;  // if there is already an imperial parameter, do nothing
        }

        fahrenheitButton.classList.add('units-button-active');  // ^^like above^^
        fahrenheitButton.children[1].style.display = 'block';
        
        celsiusButton.classList.remove('units-button-active');
        celsiusButton.children[1].style.display = 'none';

    }

    if (event.target.textContent.includes('km/h')) { // ^^like above^^

        if (unitsString.includes('mph')) {

            unitsString = unitsString.replace('&wind_speed_unit=mph', '')
        }
        windSpeedUnit = 'km/h';

        kmhButton.classList.add('units-button-active');
        kmhButton.children[1].style.display = 'block';
        
        mphButton.classList.remove('units-button-active');
        mphButton.children[1].style.display = 'none';

    } else if (event.target.textContent.includes('mph')) {

        if (!unitsString.includes('mph')) {

            unitsString = unitsString + '&wind_speed_unit=mph';

            if (unitsString.includes('fahrenheit') && unitsString.includes('mph') && unitsString.includes('inch')) {
                changeUnitsButton.textContent = 'Switch to metric';
            }
        } else {
            unitsString = unitsString;
        }
        windSpeedUnit = 'mph';

        mphButton.classList.add('units-button-active');
        mphButton.children[1].style.display = 'block';
        
        kmhButton.classList.remove('units-button-active');
        kmhButton.children[1].style.display = 'none';

    }
    
    if (event.target.textContent.includes('Millimeters')) {

        if (unitsString.includes('inch')) {

            unitsString = unitsString.replace('&precipitation_unit=inch', '')
        }
        precipitationUnit = 'mm';

        millimetersButton.classList.add('units-button-active');
        millimetersButton.children[1].style.display = 'block';
        
        inchesButton.classList.remove('units-button-active');
        inchesButton.children[1].style.display = 'none';

    } else if (event.target.textContent.includes('Inches')) {

        if (!unitsString.includes('inch')) {

            unitsString = unitsString + '&precipitation_unit=inch';

            if (unitsString.includes('fahrenheit') && unitsString.includes('mph') && unitsString.includes('inch')) {
                changeUnitsButton.textContent = 'Switch to metric';
            }
        } else {
            unitsString = unitsString;
        }
        precipitationUnit = 'in';

        inchesButton.classList.add('units-button-active');
        inchesButton.children[1].style.display = 'block';
        
        millimetersButton.classList.remove('units-button-active');
        millimetersButton.children[1].style.display = 'none';
    }
    getWeather(latitude, longitude, unitsString);
}

const unitButtons = document.getElementsByClassName('unit-button');
for (let i = 0; i < unitButtons.length; i++) {

    unitButtons[i].addEventListener('click', (event) => {

        changeUnit(event);
    })
}