if (typeof document !== 'undefined') {

    const numbers = document.getElementsByClassName('number');

    const num = Array.from(numbers);

    const submit = document.getElementById('submit');

    const hidden = document.getElementById('hidden-container');

    const span = document.getElementById('span');

    const error = document.getElementById('error');

    const returnButton = document.getElementById('return-button');

    let selectedNumber = null;

    num.forEach(number => {
        let spanText = document.createTextNode(number.innerHTML);
        number.addEventListener('click', () => {
                span.innerHTML = spanText.data;
                selectedNumber = spanText.data;
                //resetAll();
                //number.style.backgroundColor = 'hsl(216, 12%, 54%)';
        })
    })

    /*function resetAll () {
        for(let i = 0; i < num.length; i++) {
              num[i].style.backgroundColor = 'hsl(210, 28%, 21%)';
        }
    }*/

    submit.addEventListener('click', () => {
        if(selectedNumber !== null) {
            if(hidden.style.display === 'block') {
                hidden.style.display = 'none';
            } else {
                hidden.style.display = 'block';
            }  
        } else {
            error.style.display = 'block';
        }
    })

    returnButton.addEventListener('click', () => {
        if(hidden.style.display === 'block') {
            hidden.style.display = 'none';
        } else {
            hidden.style.display = 'block';
        }  
    })
}