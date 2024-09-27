function Calculator() {
    this.methods = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        'x': (a, b) => a * b,
        '/': (a, b) => a / b,
    };
    this.calculate = (a, operator, b) => {
        if (!this.methods[operator] || isNaN(Number(a)) || isNaN(Number(b))) {
            return NaN;
        }
        return this.methods[operator](a, b)
    };
}

let calc = new Calculator;
let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let previousOperator = '';

function clearVariables() {
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    previousOperator = '';
}

function isDivisionByZero(operator, secondNumber) {
    if (operator === '/' && parseFloat(secondNumber) === 0) {
        alert("Division by zero not allowed!");
        return true;
    }
    return false;
}

function assignNumber(number, buttonValue) {
    if (buttonValue === '.') {
        number += number.includes('.') ? '' : buttonValue;
    } else {
        number += buttonValue;
    }
    return number;
}

const buttonContainer = document.querySelector('.button-container');
buttonContainer.addEventListener('click', (event) => {
    const target = event.target;
    const buttonValue = target.innerText;
    const classList = target.classList;
    const display = document.querySelector('.display');

    if (classList.contains('button-num')) {
        if (currentOperator !== '') {
            secondNumber = assignNumber(secondNumber, buttonValue);
            display.innerText = secondNumber;
        } else {
            firstNumber = assignNumber(firstNumber, buttonValue);
            display.innerText = firstNumber;
        }
    }

    if (classList.contains('button-c')) {
        display.innerText = '';
        clearVariables();
    }

    if (classList.contains('button-op')) {
        currentOperator = buttonValue;
        if (firstNumber !== '' && secondNumber !== '' && previousOperator !== '') {
            if (isDivisionByZero(previousOperator, secondNumber)) {
                clearVariables();
                display.innerText = '';
                return;
            }
            firstNumber = parseFloat(firstNumber);
            secondNumber = parseFloat(secondNumber);
            const result = +calc.calculate(firstNumber, previousOperator, secondNumber).toFixed(10);
            display.innerText = result;
            firstNumber = result;
            secondNumber = '';
            previousOperator = '';
        }
        if (currentOperator !== '') {
            previousOperator = currentOperator;
        }
    }

    if (classList.contains('button-eq')) {
        if (firstNumber === '' || secondNumber === '' || currentOperator === '') {
            return;
        }
        if (isDivisionByZero(previousOperator, secondNumber)) {
            clearVariables();
            display.innerText = '';
            return;
        }
        firstNumber = parseFloat(firstNumber);
        secondNumber = parseFloat(display.innerText);
        const result = +calc.calculate(firstNumber, currentOperator, secondNumber).toFixed(10);
        display.innerText = result;
        clearVariables();
        firstNumber = result;
    }
});