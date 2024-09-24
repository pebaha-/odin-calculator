function Calculator() {
    this.methods = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    };
    this.calculate = (a, operator, b) => {
        if (!this.methods[operator] || isNaN(Number(a)) || isNaN(Number(b))) {
            return NaN;
        }
        return this.methods[operator](a, b)
    };
}

const buttonContainer = document.querySelector('.button-container');
buttonContainer.addEventListener('click', (event) => {
    const target = event.target;
    const buttonClicked = target.innerText;
    const classList = event.target.classList;
    const display = document.querySelector('.display');

    if (classList.contains('button-num')) {
        display.innerText += buttonClicked;

    }
    if (classList.contains('button-c')) {
        display.innerText = '';
    }
});