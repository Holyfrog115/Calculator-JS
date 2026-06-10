let aNumber = '0';
let bNumber = '';
let operator = '';


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
            result = divide(aNumber, bNumber);
            break;
        default:
            console.log("Unknown operator");
    }

    return result;
}


function updateOperationDisplay() {
    const operation = document.querySelector('.operation');
    operation.textContent = aNumber + ' ' + operator + ' ' + bNumber;
    operation.scrollLeft = operation.scrollWidth;
}



function digitButtons() {
    const btns = document.querySelector(".buttons-display");
    btns.addEventListener("click", (event) => {
        if (event.target.classList.contains('digit')) {
            if (operator === '') {
                if (aNumber == '0') {
                    aNumber = event.target.textContent;
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
        if (event.target.id == 'equal') {
            let reult = operate(aNumber, bNumber, operator);

        }
        else if (event.target.id == 'add') {
            operator = '+';
            updateOperationDisplay();
        }
        else if (event.target.id == 'subtract') {
            operator = '-';
            updateOperationDisplay();
        }
        else if (event.target.id == 'multiply') {
            operator = '*';
            updateOperationDisplay();
        }
        else if (event.target.id == 'divide') {
            operator = '/';
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
}


function main() {
    updateOperationDisplay();
    digitButtons();
    operationButtons();
    otherButtons();
}


main();