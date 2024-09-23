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
