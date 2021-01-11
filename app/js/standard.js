function operation() {
    this.screenStr = '';
    this.numbers = ['1','2','3','4','5','6','7','8','9','0','.'];
    this.operationsCouple = ['×','-','+','÷'];
    this.operationsSingle = ['%','x2','√','1/x','±'];
    this.flag = true;
    this.digit1 = '';
    this.digit2 = '';
    this.operant = '';
    this.type = function(digit) {
        if ( this.numbers.includes(digit) ) {
            if ( this.operant === '' ) {
                if ( this.flag === true ) {
                    this.digit1 += digit;
                    this.screenStr += digit;
                    console.log(this.screenStr);
                    document.getElementById('result').textContent = this.digit1;
                } else {
                    this.digit1 = digit;
                    this.screenStr = digit;
                    document.getElementById('result').textContent = this.digit1;
                    this.flag = true;
                }
            } else {
                if ( this.operationsCouple.includes(this.operant) ) {
                    this.flag = true;
                    this.digit2 += digit;
                    this.screenStr += digit;
                    document.getElementById('result').textContent = this.digit2;
                }
            }
        } else {
            if ( this.operationsCouple.includes(digit) ) {
                if ( this.digit1 === '' ) {
                    this.digit1 = '0';
                    this.operant = digit;
                    this.screenStr += `${this.digit1} ${this.operant} `;
                    document.getElementById('result').textContent = this.digit1;
                    this.flag = false;
                } else {
                    if ( this.digit2 === '' ) {
                        this.operant = digit;
                        this.screenStr += ` ${this.operant} `;
                        document.getElementById('result').textContent = this.digit1;
                        this.flag = false;
                    } else {
                        document.getElementById('result').textContent = this.result();
                        this.digit1 = this.result();
                        this.screenStr += ` = ${this.digit1}`;
                        this.memoryList();
                        this.screenStr = this.digit1;
                        this.digit2 = '';
                        this.operant = '';
                        this.flag = false;
                    }
                }
            } else {
                if ( digit === '=' ) {
                    if ( this.digit1 === '' ) {
                        document.getElementById('result').textContent = '0';
                        this.screenStr = '= 0';
                        this.memoryList();
                        this.screenStr = '';
                    } else {
                        if ( this.operant === '' ) {
                            document.getElementById('result').textContent = this.digit1;
                            this.screenStr = `= ${this.digit1}`;
                            this.memoryList();
                            this.flag = false;
                        } else {
                            if ( this.digit2 === '' ) {
                                let result = this.result();
                                this.digit2 = this.digit1;
                                document.getElementById('result').textContent = result;
                                this.screenStr += `${this.digit2} = ${result}`;
                                this.memoryList();
                                this.digit1 = result;
                                this.digit2 = '';
                                this.operant = '';
                                this.flag = false;
                            } else {
                                let result = this.result();
                                document.getElementById('result').textContent = result;
                                this.screenStr += ` = ${result}`;
                                this.memoryList();
                                this.digit1 = result;
                                this.digit2 = '';
                                this.operant = '';
                                this.screenStr = `${this.digit1}`;
                                this.flag = false;
                            }
                        }
                    }
                } else {
                    if ( this.operationsSingle.includes(digit) ) {
                        if( this.digit1 === '' ) {
                            if ( digit === '1/x' ) {
                                document.getElementById('result').textContent = 'You can\'t divide by zero';
                                this.screenStr = 'You can\'t divide by zero';
                                this.memoryList();
                                this.screenStr = '';
                            } else {
                                document.getElementById('result').textContent = '0';
                                this.screenStr = '= 0';
                                this.memoryList();
                                this.screenStr = '';
                            }
                        } else {
                            this.operant = digit;
                            let wayOfPrinting;
                            switch (digit) {
                                case '%':
                                    wayOfPrinting = `toPercentage(${this.digit1})`;
                                    break;
                                case 'x2':
                                    wayOfPrinting = `squareOf(${this.digit1})`;
                                    break;
                                case '√':
                                    wayOfPrinting = `squareRootOf(${this.digit1})`;
                                    break;
                                case '1/x':
                                    wayOfPrinting = `1 / ${this.digit1}`;
                                    break;
                                case '±':
                                    wayOfPrinting = `${this.digit1} x (-1)`;
                                    break;
                            }
                            let result = this.singleMethod();
                            document.getElementById('result').textContent = result;
                            this.screenStr = `${wayOfPrinting} = ${result}`;
                            this.memoryList();
                            this.digit1 = result;
                            this.screenStr = this.digit1;
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
            return (parseFloat(this.digit1) / 100).toFixed(3);
        } else if ( this.operant === 'x2' ) {
            return (Math.pow(parseFloat(this.digit1), 2)).toFixed(3);
        } else if ( this.operant === '√' ) {
            if ( parseFloat(this.digit1) >= 0.00 ) {
                return (Math.sqrt(parseFloat(this.digit1))).toFixed(3);
            } else {
                return 'Not possible';
            }
        } else if ( this.operant === '1/x' ) {
            if (parseFloat(this.digit1) > 0.0 || parseFloat(this.digit1) < 0.0) {
                return (1 / parseFloat(this.digit1)).toFixed(3);
            } else {
                return 'You cannot divide by zero';
            }
        } else if ( this.operant === '±' ) {
            return this.digit1*(-1);
        }
    };
    this.clearScreen = function() {
        this.digit1 = '';
        this.digit2 = '';
        this.operant = '';
        this.screenStr = '';
        this.flag = true;
        document.getElementById('result').textContent = '0';
    };
    this.memoryList = function() {
        let newEl = document.createElement('li');
        let operationText = document.createTextNode(this.screenStr);
        newEl.appendChild(operationText);
        let target = document.getElementById('memoryList');
        target.appendChild(newEl);
    };
    this.showMemoryList = function() {
        if(document.getElementById('memoryList').getAttribute('class') === 'visible') {
            document.getElementById('memoryList').setAttribute('class', 'notVisible');
        } else {
            document.getElementById('memoryList').setAttribute('class', 'visible');
        };
    };
    this.clearMemory = function() {
        let elements = document.getElementById('memoryList').getElementsByTagName('li');
        let container = document.getElementById('memoryList');
        for(let i = (elements.length-1); i > -1; i--) {
            container.removeChild(elements[i]);
        };

        document.getElementById('count').textContent = 0;
    };
    this.backspace = function() {
        if (this.flag) {
            if (this.digit1.length > 0 && this.operant === '') {
                this.digit1 = this.digit1.substr(0, this.digit1.length - 1);
                this.screenStr = this.digit1;
                if (this.digit1.length === 0) {
                    document.getElementById('result').textContent = '0';
                } else {
                    document.getElementById('result').textContent = this.digit1;
                }
            } else if (this.digit2.length > 0) {
                this.digit2 = this.digit2.substr(0, this.digit2.length - 1);
                this.screenStr = `${this.digit1} ${this.operant} ${this.digit2}`;
                if (this.digit2.length === 0) {
                    document.getElementById('result').textContent = '0';
                } else {
                    document.getElementById('result').textContent = this.digit2;
                }
            }
        }
    }
};

document.getElementById('result').textContent = '0';

let theOperation = new operation();

/* this is for adding numbers, plus/minus and dot */

function addChar(e) {
    let target = e.target;
    if (target.localName === 'p') {
        switch (target.textContent) {
            case 'C':
                theOperation.clearScreen();
                break;
            case 'MC':
                theOperation.clearMemory();
                break;
            default:
                theOperation.type(target.textContent);
                break;
        }
    } else if (target.localName === 'li') {
        switch (target.textContent) {
            case 'C':
                theOperation.clearScreen();
                break;
            case 'MC':
                theOperation.clearMemory();
                break;
            default:
                theOperation.type(target.textContent);
                break;
        }
        if (target.id === 'BackSpace') {
            theOperation.backspace();
        }
    } else if (target.localName === 'img') {
        theOperation.backspace();
    };
}

let numbers = document.getElementById('numbers');

numbers.addEventListener('click', addChar, false);

/* this is for adding operations x + - = */

let rightLine = document.getElementById('rightLine');

rightLine.addEventListener('click', addChar, false);

/* this is for operations in line 2 */

let line2 = document.getElementById('line2');

line2.addEventListener('click', addChar, false);

/* this is for operations in line 1 */

let line1 = document.getElementById('line1');

line1.addEventListener('click', addChar, false);

/* this is for operations in memory */

let memoryLine = document.getElementById('memory');

memoryLine.addEventListener('click', addChar, false);

/* this is for switchng the memory */

function triggerList() {
    theOperation.showMemoryList();
}

let showMemo = document.getElementById('showMemo');

showMemo.addEventListener('click', triggerList, false);

/* this is for adding up the amount of operations in memory */

function counter(e) {

    let target = e.target;

    let count = document.getElementById('count');

    let amount = target.parentElement.getElementsByTagName('li').length;

    count.textContent = amount;
}

let counting = document.getElementById('memoryList');

counting.addEventListener('DOMNodeInserted', counter, false);

/* this for getting the key pressed */

function pressedKey(e) {
    if ([43,45,46,48,49,50,51,52,53,54,55,56,57].includes(e.keyCode)) {
        theOperation.type(String.fromCharCode(e.keyCode));
    } else if ([42,47,8,13].includes(e.keyCode)) {
        switch (e.keyCode) {
            case 42:
                theOperation.type('×');
                break;
            case 47:
                theOperation.type('÷');
                break;
            case 8:
                theOperation.backspace();
                break;
            case 13:
                theOperation.type('=');
                break;
        }
    }
}

let allScreen = document.getElementsByTagName('body');

allScreen[0].addEventListener('keypress', pressedKey, false);