let aNumber = '0';
let bNumber = '';
let operator = '';
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


function operate(aNumber, bNumber, operator) {
    // Determines what function to call for answer

    let result = 0;

    switch(operator) {
        case '+':
            result = add(aNumber, bNumber);
            break;
        case '-':
            result = subtract(aNumber, bNumber);
            break;
        case '*':
            result = multiply(aNumber, bNumber);
            break;
        case '/':
            if (bNumber === 0) {
                errorHandler(0);
                return -1;
            }
            result = divide(aNumber, bNumber);
            break;
        default:
            console.log("Unknown operator");
    }

    return result;
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
        const mathOperators = ['add', 'subtract', 'multiply', 'divide'];
        const isOperatorClick = mathOperators.includes(targetId);
        const isEqualClick = targetId === 'equal';
        const hasCalculationData = operator != '' && bNumber != '';

        if (isEqualClick || (isOperatorClick && hasCalculationData)) {
            let answer = operate(+aNumber, +bNumber, operator);

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

        const operationsObj = {
            'add' : '+',
            'subtract' : '-',
            'multiply' : '*',
            'divide' : '/',
        };

        if (isOperatorClick) {
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

    operation.textContent = aNumber + ' ' + operator + ' ' + bNumber;
    operation.scrollLeft = operation.scrollWidth;

    errorText.textContent = '';
}


function updateHistoryDisplay(answer) {
    const history = document.querySelector('.history-display');

    const result = document.createElement('div');
    result.classList.add('result');

    const expression = document.createElement('span');
    expression.classList.add('expression')
    expression.textContent = aNumber + operator + bNumber;

    const equals = document.createElement('span');
    equals.classList.add('equals')
    equals.textContent = "=";

    const ans = document.createElement('span');
    ans.classList.add('answer');
    ans.textContent = Math.round(answer * 1000000) / 1000000;

    result.appendChild(expression);
    result.appendChild(equals);
    result.appendChild(ans);

    history.appendChild(result);
}


function errorHandler(errorCode) {
    const errorText = document.querySelector('.error-text');
    errorFlag = true;

    if (errorCode == 0) {
        errorText.textContent = "Division by zero is undefined";
    }
}


function main() {
    updateOperationDisplay();
    digitButtons();
    operationButtons();
    otherButtons();
}


main();