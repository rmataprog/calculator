let number1;
let number2;
let oper;
let flag = true;

function operation(digit1, operant, digit2) {
    this.digit1 = digit1;
    this.digit2 = digit2;
    this.operant = operant;
    this.result = function() {
        number2 = undefined;
        oper = undefined;
        if ( this.operant === 'Add' ) {
            let x = parseFloat(this.digit1) + parseFloat(this.digit2);
            number1 = x;
            return x.toFixed(3);
        } else if ( this.operant === 'Substract' ) {
            let x = parseFloat(this.digit1) - parseFloat(this.digit2);
            number1 = x;
            return x.toFixed(3);
        } else if ( this.operant === 'Multiply' ) {
            let x = parseFloat(this.digit1) * parseFloat(this.digit2);
            number1 = x;
            return x.toFixed(3);
        } else if ( this.operant === 'Divide' ) {
            if ( parseFloat(this.digit2) !== 0.0 ) {
                let x = parseFloat(this.digit1) / parseFloat(this.digit2);
                number1 = x;
                return x.toFixed(3);
            } else {
                return 'You can\'t divide by zero';
            }
        } else if ( this.operant === undefined ) {
            return number1;
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
        if ( flag === true && number2 === undefined && oper === undefined ) {
            number1 = undefined;
            document.getElementById('result').textContent = '';
        }
        if ( oper === undefined ) {
            flag = false;
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
    flag = true;
}

function clearScreen() {
    document.getElementById('result').textContent = '';
    number1 = undefined;
    number2 = undefined;
    oper = undefined;
}

function squareRoot() {
    if ( parseFloat(number1) >= 0.00 ) {
        let squareRootResult = Math.sqrt(parseFloat(number1));
        number1 = squareRootResult;
        document.getElementById('result').textContent = squareRootResult.toFixed(3);
        flag = true;
    } else {
        document.getElementById('result').textContent = 'Not possible';
        number1 = undefined;
    }
    number2 = undefined;
    oper = undefined;
}

function powerTwo() {
    let powerTwoResult = Math.pow(parseFloat(number1), 2);
    number1 = powerTwoResult;
    document.getElementById('result').textContent = powerTwoResult.toFixed(3);
    flag = true;
    number2 = undefined;
    oper = undefined;
}

function inverse() {
    if (parseFloat(number1) > 0.0 || parseFloat(number1) < 0.0) {
        let inverseResult = 1 / parseFloat(number1);
        number1 = inverseResult;
        document.getElementById('result').textContent = inverseResult.toFixed(3);
        flag = true;
    } else {
        document.getElementById('result').textContent = 'You cannot divide by zero';
    }
    number2 = undefined;
    oper = undefined;
}

function percentage() {
    if ( parseFloat(number1) !== undefined ) {
        number2 = undefined;
        oper = undefined;
        number1 = parseFloat(number1) / 100;
        document.getElementById('result').textContent = number1;
        flag = true;
    }
}

function plusMinus() {
    if ( oper === undefined ) {
        number1 = number1*(-1);
        document.getElementById('result').textContent = number1;
    } else if ( oper !== undefined && parseFloat(number2) !== 0.00 ) {
        number2 = number2*(-1);
        document.getElementById('result').textContent = number2;
    }
}