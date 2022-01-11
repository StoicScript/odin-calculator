//DOM
const display = document.querySelector('#display');
const numButtons = document.querySelectorAll('.num')
const opButtons = document.querySelectorAll('.op')

// VARIABLES & ARRAYS
let displayValue = display.innerHTML
let numArr = []
let opArr = [] 


// DISPLAY FUNCTIONS

function updateDisplay(value){
    if(displayValue == 0){
        display.innerHTML = ''
        displayValue = display.innerHTML
    }
    if(numArr.length > 0){
        resetDisplay()
    }
    display.innerHTML += value
    displayValue = display.innerHTML
}

function resetDisplay(){
    if(displayValue == numArr[numArr.length - 1]){
        display.innerHTML = ''
        displayValue = display.innerHTML
    }
}

function clear(){
    numArr = []
    opArr = []

    display.innerHTML = 0
    displayValue = display.innerHTML
}

// BUTTON FUNCTIONS

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
      updateDisplay(button.innerHTML);
    });
  });

opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.innerHTML == '='){
            operate(numArr[numArr.length-1],opArr[opArr.length-1], displayValue)
            opArr = []
        }

        if(button.innerHTML == 'clear'){
        clear();
      } else if (button.innerHTML != '='){
          numArr.push(displayValue)
          opArr.push(button.innerHTML)
      }

      if(opArr.length > 1 && button.innerHTML != '='){
        operate(numArr[numArr.length-2],opArr[opArr.length-2], displayValue)
      } else if(opArr.length > 2 && button.innerHTML != '='){
        operate(numArr[numArr.length-2],opArr[opArr.length-1], displayValue)
      }

    });
  });

// BASIC MATH OPERATIONS 

function add(num1,num2){
    display.innerHTML = parseFloat(+num1 + +num2).toFixed(4)
    displayValue = display.innerHTML
    numArr.push(displayValue)
};

function subtract(num1,num2){
    display.innerHTML = parseFloat(+num1 - +num2).toFixed(4)
    displayValue = display.innerHTML
    numArr.push(displayValue)
};

function multiply(num1,num2){
    display.innerHTML = parseFloat(+num1 * +num2).toFixed(4)
    displayValue = display.innerHTML
    numArr.push(displayValue)
};

function divide(num1,num2){
    display.innerHTML = parseFloat(+num1 / +num2).toFixed(4)
    displayValue = display.innerHTML
    numArr.push(displayValue)
};

// OPERATION FUNCTION

function operate(num1,operator,num2){
    switch(operator){
        case '+':
            return add(num1,num2)
        case '-':
            return subtract(num1,num2);
        case '*':
            return multiply(num1,num2);
        case '/':
            return divide(num1,num2)
    }
}



