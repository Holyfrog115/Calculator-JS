let aNumber = '0';
let bNumber = '';
let operator = '';
let aNumberUnary = '';
let bNumberUnary = '';
let aSqrt = '';
let bSqrt = '';
let expression = '';
let errorFlag = false;
let resultFlag = false;


function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b;
}


function divide(a, b) {
    return a / b;
}


function mod(a, b) {
    return a % b;
}


function square(a) {
    return a * a;
}


function squareRoot(a) {
    return Math.sqrt(a);
}


function percent(a) {
    return a / 100;
}


function factorial(a) {
    if (a <= 1) {
        return 1;
    }
    return a * factorial(a - 1);
}


function operate() {
    // Determines what function to call for answer

    let result = 0;

    if ((aSqrt && aNumber < 0) || (bSqrt && bNumber < 0)) {
        errorHandler(-3);
        return -3
    }
    else if (operator == '' && bNumber == '') {
        unaryOperate();
        return aNumber;
    }
    else if (operator != '' && bNumber == '') {
        errorHandler(-2)
        return -2;
    }
    else {
        unaryOperate();
        a = +aNumber;
        b = +bNumber;

        switch(operator) {
            case '+':
                result = add(a, b);
                break;
            case '-':
                result = subtract(a, b);
                break;
            case '*':
                result = multiply(a, b);
                break;
            case '/':
                if (b === 0) {
                    errorHandler(-1);
                    return -1;
                }
                result = divide(a, b);
                break;
            case 'mod':
                result = mod(a, b);
                break;
            default:
                console.log("Unknown operator");
        }
    }

    return result;
}


function unaryOperate() {
    let unaryOperator;

    // aNumber operators
    while (aNumberUnary) {
        unaryOperator = aNumberUnary.at(0);
        aNumberUnary = aNumberUnary.slice(0, -1);

        switch (unaryOperator) {
            // square case
            case '\u00B2':
                aNumber = square(+aNumber);
                break;
            case '%':
                aNumber = percent(+aNumber);
                break;
        }
    }
    // aNumber square roots
    while (aSqrt) {
        aSqrt = aSqrt.slice(0, -1);
        aNumber = squareRoot(+aNumber);
    }

    // bNumber operators
    while (bNumberUnary) {
        unaryOperator = bNumberUnary.at(0);
        bNumberUnary = bNumberUnary.slice(1);

        switch (unaryOperator) {
            // square case
            case '\u00B2':
                bNumber = square(+bNumber);
                break;
            case '%':
                if (operator == '+' || operator == '-') {
                    bNumber = percent(+aNumber * +bNumber);
                }
                else {
                    bNumber = percent(+bNumber);
                }
        }
    }
    // bNumber square roots
    while (bSqrt) {
        bSqrt = bSqrt.slice(0, -1);
        bNumber = squareRoot(+bNumber);
    }
}


function digitButtons() {
    const btns = document.querySelector(".buttons-display");
    btns.addEventListener("click", (event) => {
        if (event.target.classList.contains('digit')) {
            if (operator === '') {
                if (aNumber == '0' || resultFlag) {
                    aNumber = event.target.textContent;
                    resultFlag = false;
                }
                else {
                    aNumber += event.target.textContent;
                }
            }
            else {
                if (bNumber == '0') {
                    bNumber = event.target.textContent;
                }
                else {
                    bNumber += event.target.textContent;
                }
            }
            updateOperationDisplay();
        }
    });
}


function operationButtons() {
    const btns = document.querySelector(".buttons-display");
    btns.addEventListener("click", (event) => {
        const targetId = event.target.id;

        // Grouping opeartions checks for readability
        const unaryOperators = ['square', 'sqrt', 'sign-switch', 'percent'];
        const binaryOperators = ['add', 'subtract', 'multiply', 'divide', 'mod'];
        const isBinaryOperatorClick = binaryOperators.includes(targetId);
        const isUnaryOperatorClick = unaryOperators.includes(targetId);
        const isEqualClick = targetId === 'equal';
        const hasCalculationData = operator != '' && bNumber != '';
        const operationsObj = {
            'add' : '+',
            'subtract' : '-',
            'multiply' : '*',
            'divide' : '/',
            'mod': 'mod',
            'square': '\u00B2',
            'sqrt': '\u221A', 
            'percent': '%',
        };

        if (isEqualClick || (isBinaryOperatorClick && hasCalculationData)) {
            let answer = operate();

            if (!errorFlag) {
                updateHistoryDisplay(answer);
                aNumber = answer;
                operator = '';
                bNumber = '';
                updateOperationDisplay();
                resultFlag = true;
            }
            errorFlag = false;
        }

        if (isUnaryOperatorClick) {
            if (targetId == 'sqrt') {
                if (operator == '') {
                    aSqrt += operationsObj[targetId];
                }
                else {
                    bSqrt += operationsObj[targetId];
                }
            }
            else if (targetId == 'sign-switch') {
                if (bNumber == '') {
                    aNumber = +aNumber * -1;
                }
                else {
                    bNumber = +bNumber * -1;
                }
            }
            else {
                if (bNumber == '') {
                    aNumberUnary += operationsObj[targetId];
                }
                else {
                    bNumberUnary += operationsObj[targetId];
                }
            }
            
            updateOperationDisplay();
        }
        
        if (isBinaryOperatorClick) {
            operator = operationsObj[targetId];
            updateOperationDisplay();
        }
               
    });
}


function otherButtons() {
    const btns = document.querySelector(".buttons-display");
    btns.addEventListener("click", (event) => {
        if (event.target.id == 'clear') {
            aNumber = '0';
            operator = '';
            bNumber = '';
            aNumberUnary = '';
            bNumberUnary = '';
            aSqrt = '';
            bSqrt = '';

            updateOperationDisplay();
        }

        else if (event.target.id == 'dot') {
            if (operator == '' && !aNumber.includes('.')) {
                aNumber += '.';
            }
            else if (operator != '' && bNumber != '' && !bNumber.includes('.')) {
                bNumber += '.';
            }

            updateOperationDisplay();
        }

        else if (event.target.id == 'backspace') {
            if (operator == '') {
                if (aNumberUnary) {
                    aNumberUnary = aNumberUnary.slice(0, -1);
                }
                else if (aNumber == '0' && aSqrt) {
                    aSqrt = aSqrt.slice(0, -1);
                }
                else {
                    aNumber = aNumber.slice(0, -1);
                    if (aNumber == '') {
                        aNumber = '0';
                    }
                }
            }
            else if (operator != '' && bNumber == '' && bSqrt == '') {
                operator = '';
            }
            else if (operator != '' && bNumber == '' && bSqrt != '') {
                bSqrt = bSqrt.slice(0, -1);
            }
            else {
                if (bNumberUnary) {
                    bNumberUnary = bNumberUnary.slice(0, -1);
                }
                else {
                    bNumber = bNumber.slice(0, -1);
                }
            }
            
            updateOperationDisplay();
        }
    });

    btns.addEventListener('dblclick', (event) => {
        if (event.target.id == 'clear') {
            const historyDisplay = document.querySelector('.history-display');
            historyDisplay.replaceChildren();
        }
    })
}


function updateOperationDisplay() {
    const operation = document.querySelector('.operation');
    const errorText = document.querySelector('.error-text');
    expression = aSqrt + aNumber + aNumberUnary + ' ' + operator + ' ' + bSqrt +  bNumber + bNumberUnary;

    operation.textContent = expression;
    operation.scrollLeft = operation.scrollWidth;

    errorText.textContent = '';
}


function updateHistoryDisplay(answer) {
    const history = document.querySelector('.history-display');

    const result = document.createElement('div');
    result.classList.add('result');

    const expressionSpan = document.createElement('span');
    expressionSpan.classList.add('expression')
    expressionSpan.textContent = expression;

    const equals = document.createElement('span');
    equals.classList.add('equals')
    equals.textContent = "=";

    const ans = document.createElement('span');
    ans.classList.add('answer');
    ans.textContent = Math.round(answer * 1000000) / 1000000;

    result.appendChild(expressionSpan);
    result.appendChild(equals);
    result.appendChild(ans);

    history.appendChild(result);
}


function errorHandler(errorCode) {
    const errorText = document.querySelector('.error-text');
    errorFlag = true;

    if (errorCode == -1) {
        errorText.textContent = "Division by zero is undefined";
    }
    else if (errorCode == -2) {
        errorText.textContent = "Malformed expression";
    }
    else if (errorCode == -3) {
        errorText.textContent = "Math error"
    }
}


function main() {
    updateOperationDisplay();
    digitButtons();
    operationButtons();
    otherButtons();
}


main();