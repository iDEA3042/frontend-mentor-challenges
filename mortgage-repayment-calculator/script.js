const mortgageAmount = document.getElementById('mortgage-amount-input');
const mortgageTerm = document.getElementById('mortgage-term-input');
const mortgageInterest = document.getElementById('mortgage-interest-input');
const repaymentRadio = document.getElementById('repayment-radio');
const interestRadio = document.getElementById('interest-radio');
const repaymentBackground = document.getElementsByClassName('mortgage-type-input-radio-box')[0];
const interestBackground = document.getElementsByClassName('mortgage-type-input-radio-box')[1];
const rightSide = document.querySelector('.right-side');
const rightSideContainer = document.querySelector('.right-side-container');
const repaymentResultContainer = document.querySelector('.repayment-result-container');

function adjustInput() {

    mortgageAmount.oninput = () => {
        mortgageAmount.value = mortgageAmount.value.replace(/[^0-9]/, '');
    }

    mortgageTerm.oninput = () => {
        mortgageTerm.value = mortgageTerm.value.replace(/[^0-9]/, '');
    }

    mortgageInterest.oninput = () => {
        mortgageInterest.value = mortgageInterest.value.replace(/[^0-9 \.]/, '');

        for (let i = 0; i < mortgageInterest.value.length; i++) {

            if (mortgageInterest.value[i] !== '.') {
                mortgageInterest.setAttribute('maxlength', '2')
            } else if (mortgageInterest.value[i] === '.') {
                mortgageInterest.setAttribute('maxlength', '3');
            }
        }

        if (mortgageInterest.value.length > 1) {

            if ((mortgageInterest.value[mortgageInterest.value.length-1] === '.') && (mortgageInterest.value[mortgageInterest.value.length-2] === '.')) {
                mortgageInterest.value = mortgageInterest.value.slice(0, -1);
                console.log(mortgageInterest.value)
            }
        }
        
    }
}

adjustInput();

function checkInputs() {

    const poundSign = document.querySelector('.pound-sign');
    const yearsSign = document.querySelector('.years-sign');
    const percentSign = document.querySelector('.percent-sign');

    const errorText = document.getElementsByClassName('error-text');

    function checkAmount() {

        if (mortgageAmount.value === '') {
            errorText[0].style.visibility = 'visible';
            mortgageAmount.style.borderColor = 'red';
            poundSign.classList.add('sign-error');
            return false;
        } else {
            errorText[0].style.visibility = 'hidden';
            mortgageAmount.style.borderColor = 'black';
            poundSign.classList.remove('sign-error');
            return true;
        }
    }

    checkAmount();

    function checkTerm() {

        if (mortgageTerm.value === '') {
            errorText[1].style.visibility = 'visible';
            mortgageTerm.style.borderColor = 'red';
            yearsSign.classList.add('sign-error');
            return false;
        } else {
            errorText[1].style.visibility = 'hidden';
            mortgageTerm.style.borderColor = 'black';
            yearsSign.classList.remove('sign-error');
            return true;
        }
    }

    checkTerm();

    function checkInterest() {

        if (mortgageInterest.value === '') {
            errorText[2].style.visibility = 'visible';
            mortgageInterest.style.borderColor = 'red';
            percentSign.classList.add('sign-error');
            return false;
        } else {
            errorText[2].style.visibility = 'hidden';
            mortgageInterest.style.borderColor = 'black';
            percentSign.classList.remove('sign-error');
            return true;
        }
    }

    checkInterest();

    function checkRadios() {

        if (repaymentRadio.checked || interestRadio.checked) {
            document.getElementsByClassName('mortgage-type-input-radio-box')[0].style.borderColor = '';
            document.getElementsByClassName('mortgage-type-input-radio-box')[1].style.borderColor = '';
            errorText[3].style.visibility = 'hidden';
            return true;

        } else {
            document.getElementsByClassName('mortgage-type-input-radio-box')[0].style.borderColor = 'red';
            document.getElementsByClassName('mortgage-type-input-radio-box')[1].style.borderColor = 'red';
            errorText[3].style.visibility = 'visible';
            return false;
        }
    }

    checkRadios();

    calculate(checkAmount(), checkTerm(), checkInterest(), checkRadios());
}

function changeBGColor() {

    repaymentRadio.onclick = () => {
        repaymentBackground.style.backgroundColor = 'hsla(67, 87%, 62%, 0.618)';
        interestBackground.style.backgroundColor = '';
    }

    interestRadio.onclick = () => {
        interestBackground.style.backgroundColor = 'hsla(67, 87%, 62%, 0.618)';
        repaymentBackground.style.backgroundColor = '';
    }
}

changeBGColor();

function calculate(input1, input2, input3, input4) {

    const monthlyRepaymentResult = document.getElementById('monthly-repayment-result');
    const totalRepaymentResult = document.getElementById('total-repayment-result');

    if ((input1 && input2 && input3 && input4) === true) {

        rightSide.style.alignItems = 'flex-start';
        rightSideContainer.style.display = 'none';
        repaymentResultContainer.style.display = 'flex';

        if (repaymentRadio.checked) {

            let totalResult = (Number(mortgageAmount.value) * Number((mortgageInterest.value / 100))) * Number(mortgageTerm.value) + Number(mortgageAmount.value);
            let monthlyResult = totalResult / Number(mortgageTerm.value) / 12;

            let newTotalFormat = totalResult.toLocaleString('en-US');
            let newMonthlyFormat = monthlyResult.toLocaleString('en-US');

            monthlyRepaymentResult.innerHTML = `£${newMonthlyFormat}`;
            totalRepaymentResult.innerHTML = `£${newTotalFormat}`;

            if (mortgageTerm.value === '0' && mortgageInterest.value === '0') {
                monthlyRepaymentResult.innerHTML = `£0`;
            }

        } else if (interestRadio.checked) {

            let totalResult = Number(mortgageAmount.value) * Number((mortgageInterest.value / 100));
            let monthlyResult = totalResult / 12;

            let newTotalFormat = totalResult.toLocaleString('en-US');
            let newMonthlyFormat = monthlyResult.toLocaleString('en-US');

            monthlyRepaymentResult.innerHTML = `£${newMonthlyFormat}`;
            totalRepaymentResult.innerHTML = `£${newTotalFormat}`;

        } 
    }
}

function clearAllInputs() {

    mortgageAmount.value = '';
    mortgageTerm.value = '';
    mortgageInterest.value = '';
    repaymentRadio.checked = false;
    repaymentBackground.style.backgroundColor = '';
    interestRadio.checked = false;
    interestBackground.style.backgroundColor = '';

    rightSide.style.alignItems = 'center';
    rightSideContainer.style.display = 'flex';
    repaymentResultContainer.style.display = 'none';
}