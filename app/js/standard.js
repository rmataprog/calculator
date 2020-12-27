let number1;
let number2;
let oper;

function operation(digit1, operant, digit2) {
    this.digit1 = digit1;
    this.digit2 = digit2;
    this.operant = operant;
    this.result = function() {
        number1 = undefined;
        number2 = undefined;
        oper = undefined;
        if (this.operant === 'Add') {
            let x = parseFloat(this.digit1) + parseFloat(this.digit2); 
            return x.toFixed(3);
        } else if (this.operant === 'Substract') {
            let x = parseFloat(this.digit1) - parseFloat(this.digit2);
            return x.toFixed(3);
        } else if (this.operant === 'Multiply') {
            let x = parseFloat(this.digit1) * parseFloat(this.digit2);
            return x.toFixed(3);
        } else if (this.operant === 'Divide') {
            if (parseFloat(this.digit2) !== 0.0) {
                let x = parseFloat(this.digit1) / parseFloat(this.digit2);
                return x.toFixed(3);
            } else {
                return 'You can\'t divide by zero';
            }
        }
    }
}

let numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0,
    dot: ".",
    addDigit: function(number) { 
        if (number1 === undefined && number2 === undefined && oper === undefined) {
            document.getElementById('result').textContent = '';
        }
        if ( oper === undefined ) {
            let screenDigit = document.getElementById('result');
            let str = screenDigit.textContent;
            number1 = str + number;
            document.getElementById('result').textContent = number1;
        } else {
            let screenDigit = document.getElementById('result');
            let str = screenDigit.textContent;
            number2 = str + number;
            document.getElementById('result').textContent = number2;
        }
    }
}

function addOperant(operation) {
    document.getElementById('result').textContent = '';
    oper = operation;
}

function result() {
    let finalResult = new operation(number1, oper, number2);
    document.getElementById('result').textContent = finalResult.result();
}

function erase() {
    document.getElementById('result').textContent = '';
    number1 = undefined;
    number2 = undefined;
    oper = undefined;
}

function squareRoot() {
    let squareRootResult = Math.sqrt(parseFloat(number1));
    document.getElementById('result').textContent = squareRootResult.toFixed(3);
    number1 = undefined;
    number2 = undefined;
    oper = undefined;
}

function powerTwo() {
    let powerTwoResult = Math.pow(parseFloat(number1), 2);
    document.getElementById('result').textContent = powerTwoResult.toFixed(3);
    number1 = undefined;
    number2 = undefined;
    oper = undefined;
}