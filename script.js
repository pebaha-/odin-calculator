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
let operator = '';

function clearState() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
}

const buttonContainer = document.querySelector('.button-container');
buttonContainer.addEventListener('click', (event) => {
    const target = event.target;
    const buttonValue = target.innerText;
    const classList = target.classList;
    const display = document.querySelector('.display');

    if (classList.contains('button-num')) {
        display.innerText += buttonValue;
    }

    if (classList.contains('button-c')) {
        display.innerText = '';
        clearState();
    }

    if (classList.contains('button-op')) {
        if (firstNumber === '') {
            firstNumber = parseFloat(display.innerText);
        } else {
            secondNumber = parseFloat(display.innerText);
        }
        operator = buttonValue;
        display.innerText = '';
    }

    if (classList.contains('button-eq')) {
        if (firstNumber === '' || operator === '') {
            return;
        }
        secondNumber = parseFloat(display.innerText);
        const result = +calc.calculate(firstNumber, operator, secondNumber).toFixed(10);
        display.innerText = result;
        clearState();
    }
});