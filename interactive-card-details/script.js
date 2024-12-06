const cardNumber = document.getElementById('card-number'),
 cardName = document.getElementById('card-name'),
 cardDateMonth = document.getElementById('card-date-month'),
 cardDateYear = document.getElementById('card-date-year'),
 cardCVC = document.getElementById('card-cvc');

const nameInput = document.getElementById('name-input'),
 numberInput = document.getElementById('number-input'),
 monthInput = document.getElementById('month-input'),
 yearInput = document.getElementById('year-input'),
 cvcInput = document.getElementById('cvc-input');

const errorText = document.getElementsByClassName('error-text');
const confirmButton = document.getElementById('confirm');
const continueButton = document.getElementById('continue');
const inputSide = document.getElementsByClassName('inputs')[0];
const inputs = document.getElementsByClassName('input');
const success = document.getElementsByClassName('success')[0];

function adjustInput() {

    nameInput.oninput = () => {

        nameInput.value = nameInput.value.replace(/[^a-žA-Ž \ ]/, '');

        if (nameInput.value === '') {
            cardName.innerHTML = 'Jane Appleseed';
        } else {
            cardName.innerHTML = nameInput.value;
        }
    }

    numberInput.oninput = (e) => {
        
        let number = String(e.target.value);
        let cleanNumber = '';
        for (let i = 0; i < number.length; i++) {
            if (/^[0-9]+$/.test(number.charAt(i))) {
                cleanNumber += number.charAt(i);
            }
        }

        if (e.data !== null) {
            let formatNumber = '';
            for (let i = 0; i < cleanNumber.length; i++) {
                if (i === 3 || i === 7 || i === 11) {
                    formatNumber += cleanNumber.charAt(i) + ' ';
                } else {
                    formatNumber += cleanNumber.charAt(i);
                }
            }
            e.target.value = formatNumber;
        }

        if (numberInput.value === '') {
            cardNumber.innerHTML = '0000 0000 0000 0000';
        } else {
            cardNumber.innerHTML = numberInput.value;
        }
    }


    monthInput.oninput = () => {

        monthInput.value = monthInput.value.replace(/[^0-9 \ ]/, '');

        if (monthInput.value === '') {
            cardDateMonth.innerHTML = '00';
        } else {
            cardDateMonth.innerHTML = monthInput.value;
        }

    }

    yearInput.oninput = () => {

        yearInput.value = yearInput.value.replace(/[^0-9 \ ]/, '');

        if (yearInput.value === '') {
            cardDateYear.innerHTML = '00';
        } else {
            cardDateYear.innerHTML = yearInput.value;
        }
    }

    cvcInput.oninput = () => {

        cvcInput.value = cvcInput.value.replace(/[^0-9 \ ]/, '');

        if (cvcInput.value === '') {
            cardCVC.innerHTML = '000';
        } else {
            cardCVC.innerHTML = cvcInput.value;
        }
    }
}
adjustInput();

function click() {

    confirmButton.onclick = () => {

        function checkName() {
            if (nameInput.value !== '') {

                errorText[0].style.display = 'none';
                return true;
            } else {
        
                errorText[0].style.display = 'block';
                return false;
            }
        }
        checkName();

        function checkNumber() {
            if (numberInput.value !== '' && numberInput.value.length === 19) {

                errorText[1].style.display = 'none';
                return true;
            } else {
        
                errorText[1].style.display = 'block';
                return false;
            }
        }
        checkNumber();

        function checkDates() {
            if ((monthInput.value !== '' && yearInput.value !== '') && (monthInput.value < 13 && yearInput.value > 24)) {

                errorText[2].style.display = 'none';
                return true;
            } else {
        
                errorText[2].style.display = 'block';
                return false;
            }
        }
        checkDates();

        function checkCVC() {
            if (cvcInput.value !== '' && cvcInput.value.length === 3) {

                errorText[3].style.display = 'none';
                return true;
            } else {
        
                errorText[3].style.display = 'block';
                return false;
            }
        }
        checkCVC();

        if (checkName() && checkNumber() && checkDates() && checkCVC()) {

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].style.display = 'none';
            }

            success.style.display = 'flex';

            confirmButton.style.display = 'none';
            continueButton.style.display = 'block';
        }
    }

    continueButton.onclick = () => {

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].style.display = 'flex';
            }

            success.style.display = 'none';

            continueButton.style.display = 'none';
            confirmButton.style.display = 'block';
    }
}

click();