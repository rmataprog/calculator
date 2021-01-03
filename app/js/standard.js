function operation() {
    this.operations = [];
    this.screenStr = '';
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
                        this.operations.push(this.screenStr);
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
                        this.operations.push('= 0');
                    } else {
                        if ( this.operant === '' ) {
                            document.getElementById('result').textContent = this.digit1;
                            this.operations.push(`= ${this.digit1}`);
                            this.memoryList();
                            this.flag = false;
                        } else {
                            if ( this.digit2 === '' ) {
                                let result = this.result();
                                this.digit2 = this.digit1;
                                document.getElementById('result').textContent = result;
                                this.screenStr += `${this.digit2} = ${result}`;
                                this.operations.push(this.screenStr);
                                this.memoryList();
                                this.digit1 = result;
                                this.digit2 = '';
                                this.operant = '';
                                this.flag = false;
                            } else {
                                let result = this.result();
                                document.getElementById('result').textContent = result;
                                this.screenStr += ` = ${result}`;
                                this.operations.push(this.screenStr);
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
                            if ( digit === 'inverser' ) {
                                document.getElementById('result').textContent = 'You can\'t divide by zero';
                                this.screenStr = '';
                                this.operations.push('You can\'t divide by zero');
                                this.memoryList();
                            } else {
                                document.getElementById('result').textContent = '0';
                                this.screenStr = '';
                                this.operations.push('= 0');
                                this.memoryList();
                            }
                        } else {
                            this.operant = digit;
                            let wayOfPrinting;
                            switch (digit) {
                                case '%':
                                    wayOfPrinting = `toPercentage(${this.digit1})`;
                                    break;
                                case 'power2':
                                    wayOfPrinting = `squareOf(${this.digit1})`;
                                    break;
                                case 'root':
                                    wayOfPrinting = `squareRootOf(${this.digit1})`;
                                    break;
                                case 'inverser':
                                    wayOfPrinting = `1 / ${this.digit1}`;
                                    break;
                                case '+/-':
                                    wayOfPrinting = `${this.digit1} x (-1)`;
                                    break;
                            }
                            let result = this.singleMethod();
                            document.getElementById('result').textContent = result;
                            this.screenStr = `${wayOfPrinting} = ${result}`;
                            this.operations.push(this.screenStr);
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
        } else if ( this.operant === 'power2' ) {
            return (Math.pow(parseFloat(this.digit1), 2)).toFixed(3);
        } else if ( this.operant === 'root' ) {
            if ( parseFloat(this.digit1) >= 0.00 ) {
                return (Math.sqrt(parseFloat(this.digit1))).toFixed(3);
            } else {
                return 'Not possible';
            }
        } else if ( this.operant === 'inverser' ) {
            if (parseFloat(this.digit1) > 0.0 || parseFloat(this.digit1) < 0.0) {
                return (1 / parseFloat(this.digit1)).toFixed(3);
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
        this.screenStr = '';
        this.flag = true;
        document.getElementById('result').textContent = '0';
    };
    this.memoryList = function() {
        document.getElementById('memoryList').setAttribute('class', 'visible');
        let theList = document.getElementById('memoryList');
        let msg = '';
        if(this.operations.length>0) {
            for(let i=0; i<this.operations.length; i++) {
                msg += `<li>${this.operations[i]}</li>`;
            };
            theList.innerHTML = msg;
        } else {
            theList.innerHTML = `<li></li>`;
        }
    };
    this.showMemoryList = function() {
        if(document.getElementById('memoryList').getAttribute('class') === 'visible') {
            document.getElementById('memoryList').setAttribute('class', 'notVisible');
        } else {
            document.getElementById('memoryList').setAttribute('class', 'visible');
        };
    };
    this.clearMemory = function() {
        this.operations = [];
        this.memoryList();
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
