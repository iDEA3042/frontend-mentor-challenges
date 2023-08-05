if (typeof document !== undefined) {
    const main = document.querySelector('main'),
          input = document.getElementById('email'),
          firstButton = document.getElementById('first-button'),
          secondButton = document.getElementById('second-button'),
          errorText = document.getElementById('error-text'),
          span = document.getElementById('span'),
          firstCont = document.getElementById('first-container'),
          secondCont = document.getElementById('second-container');
          

    firstButton.addEventListener('click', () => {
        if (input.value === '') {
            input.classList.add('error-input');
            errorText.style.visibility = 'visible';
        } else if (input.value !== '') {
            firstCont.style.visibility = 'hidden';
            main.style.backgroundColor = 'transparent';
            secondCont.style.visibility = 'visible';
            span.innerHTML = input.value;
        };
    });

    input.addEventListener('focus', () => {
        if (input.value === '') {
            input.classList.remove('error-input');
            errorText.style.visibility = 'hidden';
        };
    });

    secondButton.addEventListener('click', () => {
        secondCont.style.visibility = 'hidden';
        firstCont.style.visibility = 'visible';
        main.style.backgroundColor = 'white';
        input.value = '';
    })
}