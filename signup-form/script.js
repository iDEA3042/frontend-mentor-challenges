if (typeof document !== 'undefined') {

    const form = document.getElementById('form');
    const inputFirstName = document.getElementById('input-firstName');
    const inputLastName = document.getElementById('input-lastName');
    const inputEmail = document.getElementById('input-email');
    const inputPassword = document.getElementById('input-password');
    const errorText = document.getElementsByClassName('error-text');


    function validateForm() {
        const firstName = document.forms["form"]["firstname"].value;
        const lastName = document.forms["form"]["lastname"].value;
        const email = document.forms["form"]["email"].value;
        const password = document.forms["form"]["password"].value;
        const emailPlaceholder = document.getElementsByName('email')[0];

            if (firstName === '') {
                inputFirstName.classList.add('input-error');
                inputFirstName.placeholder = '';
                for (let i = 0; i < errorText.length; i++) {
                    errorText[0].style.display = 'block';
                }
            } else {
                inputFirstName.addEventListener('keyup', () => {
                    inputFirstName.classList.remove('input-error');
                    errorText[0].style.display = 'none';
                    inputFirstName.placeholder = 'First Name';
                })
            }

            if (lastName === '') {
                inputLastName.classList.add('input-error');
                inputLastName.placeholder = '';
                for (let i = 0; i < errorText.length; i++) {
                    errorText[1].style.display = 'block';
                }
            } else {
                inputLastName.addEventListener('keyup', () => {
                    inputLastName.classList.remove('input-error');
                    errorText[1].style.display = 'none';
                    inputLastName.placeholder = 'Last Name';
                })
            }

            if (email === '') {
                inputEmail.classList.add('input-error');
                emailPlaceholder.placeholder = 'email@example/com';
                emailPlaceholder.style.setProperty('--placeholder-color', 'red');
                emailPlaceholder.style.setProperty('--placeholder-weight', 'bold');
                for (let i = 0; i < errorText.length; i++) {
                    errorText[2].style.display = 'block';
                }
            } else {
                inputEmail.addEventListener('keyup', () => {
                    inputEmail.classList.remove('input-error');
                    errorText[2].style.display = 'none';
                    emailPlaceholder.placeholder = 'Email Address';
                    emailPlaceholder.style.setProperty('--placeholder-color', '#777777');
                    emailPlaceholder.style.setProperty('--placeholder-weight', 'none');
                })
            }

            if (password === '') {
                inputPassword.classList.add('input-error');
                inputPassword.placeholder = '';
                for (let i = 0; i < errorText.length; i++) {
                    errorText[3].style.display = 'block';
                }
            } else {
                inputPassword.addEventListener('keyup', () => {
                    inputPassword.classList.remove('input-error');
                    errorText[3].style.display = 'none';
                    inputPassword.placeholder = 'Password';
                })
            }

            return false;
        

    }

    /*function makeVisible() {
        for (let i = 0; i < errorText.length; i++) {
            errorText[i].style.display = 'block';
        }
    }*/

    function handleForm(event) {
        event.preventDefault();
    }

    
    form.addEventListener('submit', handleForm);

}