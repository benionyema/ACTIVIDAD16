const form = document.getElementById('form');
const username = document.getElementById('username');
const age = document.getElementById('age');
const url = document.getElementById('url');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Check email is valid
function checkEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function checkRequired(campos) {
    campos.forEach(campo => {
        if (campo.value.trim() === '') {
            showError(campo, 'This field is required');
        } else {
            showSuccess(campo);
        }
    });
}

function checkLength(campo, name, a, b) {
    if (campo.value.length < 3) {
        showError(campo, `${name} must be at least ${a} characters`);
    }
    else if (campo.value.length > 15) {
        showError(campo, `${name} must be lower than ${b} characters`);
    }
    else {
        showSuccess(campo);
    }
}

function checkPasswordsMatch(campo1, campo2) {
    if (campo1 != campo2) {
        showError(campo2, 'Passwords do not match');
    }
    else {
        showSuccess(campo2);
    }
}

function checkRange(age, a, b) {
    if (age.value < a || age.value > b) {
        showError(age, `Age must be greater than ${a}`);
    }
    else if (age.value > b) {
        showError(age, `Age must be less than ${b}`);
    }
    else {
        showSuccess(age);
    }
}

function checkUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

//Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2, age, url]);
    checkLength(username, "Username", 3, 15);
    checkLength(password, "Password", 6, 12);
    checkPasswordsMatch(password, password2);
    checkRange(age, 0, 999);
    checkUrl(url);
});
