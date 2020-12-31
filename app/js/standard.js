let number1;
let number2;
let oper;
let flag = true;

function operation() {
    this.numbers = ['1','2','3','4','5','6','7','8','9','0','.'];
    this.operationsCouple = ['×','-','+','÷'];
    this.operationsSingle = ['%','power2','root','inverser','+/-'];
    this.flag = true;
    this.digit1 = '';
    this.digit2 = '';
    this.operant = '';
    this.type = function(digit) {
        if ( this.numbers.includes(digit) ) {
            if ( this.operant === '' ) {
                if ( this.flag === true ) {
                    this.digit1 += digit;
                    document.getElementById('result').textContent = this.digit1;
                } else {
                    this.digit1 = digit;
                    document.getElementById('result').textContent = this.digit1;
                    this.flag = true;
                }
            } else {
                if ( this.operationsCouple.includes(this.operant) ) {
                    this.digit2 += digit;
                    document.getElementById('result').textContent = this.digit2;
                }
            }
        } else {
            if ( this.operationsCouple.includes(digit) ) {
                if ( this.digit1 === '' ) {
                    this.digit1 = '0';
                    this.operant = digit;
                    document.getElementById('result').textContent = this.digit1;
                    this.flag = false;
                } else {
                    if ( this.digit2 === '' ) {
                        this.operant = digit;
                        document.getElementById('result').textContent = this.digit1;
                        this.flag = false;
                    } else {
                        document.getElementById('result').textContent = this.result();
                        this.digit1 = this.result();
                        this.digit2 = '';
                        this.operant = '';
                        this.flag = false;
                    }
                }
            } else {
                if ( digit === '=' ) {
                    if ( this.digit1 === '' ) {
                        document.getElementById('result').textContent = '0';
                    } else {
                        if ( this.operant === '' ) {
                            document.getElementById('result').textContent = this.digit1;
                            this.flag = false;
                        } else {
                            if ( this.digit2 === '' ) {
                                this.digit2 = this.digit1;
                                document.getElementById('result').textContent = this.result();
                                this.digit1 = this.result();
                                this.digit2 = '';
                                this.operant = '';
                                this.flag = false;
                            } else {
                                document.getElementById('result').textContent = this.result();
                                this.digit1 = this.result();
                                this.digit2 = '';
                                this.operant = '';
                                this.flag = false;
                            }
                        }
                    }
                } else {
                    if ( this.operationsSingle.includes(digit) ) {
                        if( this.digit1 === '' ) {
                            if ( digit === 'inverser' ) {
                                document.getElementById('result').textContent = 'You can\'t divide by zero';
                            } else {
                                document.getElementById('result').textContent = '0';
                            }
                        } else {
                            this.operant = digit;
                            document.getElementById('result').textContent = this.singleMethod();
                            this.digit1 = this.singleMethod();
                            this.digit2 = '';
                            this.operant = '';
                            this.flag = false;
                        }
                    }
                }
            }
        }
    };
    this.result = function() {
        if ( this.operant === '+' ) {
            let x = parseFloat(this.digit1) + parseFloat(this.digit2);
            return x.toFixed(3);
        } else if ( this.operant === '-' ) {
            let x = parseFloat(this.digit1) - parseFloat(this.digit2);
            return x.toFixed(3);
        } else if ( this.operant === '×' ) {
            let x = parseFloat(this.digit1) * parseFloat(this.digit2);
            return x.toFixed(3);
        } else if ( this.operant === '÷' ) {
            if ( parseFloat(this.digit2) !== 0.0 ) {
                let x = parseFloat(this.digit1) / parseFloat(this.digit2);
                return x.toFixed(3);
            } else {
                return 'You can\'t divide by zero';
            }
        }
    };
    this.singleMethod = function() {
        if ( this.operant === '%' ) {
            return parseFloat(this.digit1) / 100;
        } else if ( this.operant === 'power2' ) {
            return Math.pow(parseFloat(this.digit1), 2);
        } else if ( this.operant === 'root' ) {
            if ( parseFloat(this.digit1) >= 0.00 ) {
                return Math.sqrt(parseFloat(this.digit1));
            } else {
                return 'Not possible';
            }
        } else if ( this.operant === 'inverser' ) {
            if (parseFloat(this.digit1) > 0.0 || parseFloat(this.digit1) < 0.0) {
                return 1 / parseFloat(this.digit1);
            } else {
                return 'You cannot divide by zero';
            }
        } else if ( this.operant === '+/-' ) {
            return this.digit1*(-1);
        }
    };
    this.clearScreen = function() {
        this.digit1 = '';
        this.digit2 = '';
        this.operant = '';
        this.flag = true;
        document.getElementById('result').textContent = '0';
    }
};

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

document.getElementById('result').textContent = '0';
let theOperation = new operation();
