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
    const display = document.querySelector('.operation-display');
    const operation = document.querySelector('.operation');
    if (operator === '') {
        operation.textContent = aNumber;
        display.scrollLeft = display.scrollWidth;
    }
    else if (operator !== '' && bNumber == '') {
        operation.textContent = aNumber + ' ' + operator;
        display.scrollLeft = display.scrollWidth;
    }
    else {
        operation.textContent = aNumber + ' ' + operator + ' ' + bNumber;
        display.scrollLeft = display.scrollWidth;
    }
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


function main() {
    updateOperationDisplay();
    digitButtons();
}


main();