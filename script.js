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

function clearState() {
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    previousOperator = '';
}

const buttonContainer = document.querySelector('.button-container');
buttonContainer.addEventListener('click', (event) => {
    const target = event.target;
    const buttonValue = target.innerText;
    const classList = target.classList;
    const display = document.querySelector('.display');

    if (classList.contains('button-num')) {
        if (currentOperator !== '') {
            secondNumber += buttonValue;
            display.innerText = secondNumber;
        } else {
            firstNumber += buttonValue;
            display.innerText = firstNumber;
        }
    }

    if (classList.contains('button-c')) {
        display.innerText = '';
        clearState();
    }

    if (classList.contains('button-op')) {
        currentOperator = buttonValue;
        if (firstNumber !== '' && secondNumber !== '' && previousOperator !== '') {
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
        if (firstNumber === '' || currentOperator === '') {
            return;
        }
        firstNumber = parseFloat(firstNumber);
        secondNumber = parseFloat(display.innerText);
        const result = +calc.calculate(firstNumber, currentOperator, secondNumber).toFixed(10);
        display.innerText = result;
        clearState();
        firstNumber = result;
    }
});