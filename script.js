// Upgrade suggestion - add a phone number to form


const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error'; // the .className property overides the class name that was added to the html
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show Success ouline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

//Check email is valid

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(input.value.trim())) {
        showSuccess();
    } else {
        showError(input, 'Email is not valid');
    }
};

//Check passwords match 
function checkPasswords(input, input2) {
    if(input.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    } else if(input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`)
    } else {
        showSuccess(input)
    }
}

//Check Required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') { //trim() removes white space
            showError(input, `${getFieldName(input)} is required`); //input grabs id name
        } else {
            showSuccess(input)
        } 
    });
};

//Check input Length
function checkLength(input, min, max) {
    if(input.value.length < min) { 
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

// .Value
//The value property sets or returns the value of the value attribute of a text field.The value property contains the default value OR the value a user types in (or a value set by a script).


//get field name

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1) //charAt() gives a specific letter in a string in this case its the first letter of the input id (for password it is 'p'). toUpperCase() turns a value to uppercase. We then concatenate the rest of the id word using input.id and slice of the first character using slice.(1)
}
 
//Event Listener
form.addEventListener('submit', function(e) {

    e.preventDefault();

    checkRequired([username, email, password, password2])

    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswords(password, password2);

});