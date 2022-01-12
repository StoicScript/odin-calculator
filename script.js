//DOM
const display = document.querySelector('#display');
const numButtons = document.querySelectorAll('.num')
const opButtons = document.querySelectorAll('.op')

// VARIABLES & ARRAYS
let displayValue = Number(display.innerHTML)
let numArr = []
let opArr = [] 

// DISPLAY FUNCTIONS

function updateDisplay(value){

    if(displayValue.length > 16) {
        alert('Number tooooo loooooonnnnnggggg')
        return;
    }

    if(value == '.' && hasDecimal(displayValue)){
        if(displayValue == numArr[numArr.length-1]){
            
        }else {
            return
        }
    }

    if(displayValue === 0){
        display.innerHTML = ''
        displayValue = display.innerHTML
    }

    if(value == '.'){
        if(!displayValue){
            display.innerHTML = 0
            displayValue = display.innerHTML
        }
    }

    if(numArr.length > 0){
        resetDisplay(value)
        if(value == '.' && !displayValue){
            display.innerHTML += 0
            displayValue = display.innerHTML
        }
    }
    display.innerHTML += value
    displayValue = display.innerHTML
}

function resetDisplay(value){
    if(displayValue == numArr[numArr.length - 1]){
        if(value == '.'){
            display.innerHTML += value
            displayValue = display.innerHTML
        }
        display.innerHTML = ''
        displayValue = display.innerHTML
    }
}

function clear(){
    numArr = []
    opArr = []
    display.innerHTML = 0
    displayValue = Number(display.innerHTML)
}

// BUTTON FUNCTIONS

numButtons.forEach((button) => {
    button.addEventListener('mousedown', () => {
      updateDisplay(button.innerHTML);
      button.style.transform = "translate(-2px,2px)";
      button.style.boxShadow = "none"
    });
    button.addEventListener('mouseup', () => {
        button.style.transform = "none";
        button.style.boxShadow = "-2px 2px black"
      });
  });

opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.innerHTML == '='){
            if(opArr[opArr.length-1] == '÷' && displayValue == 0){
                alert("Nice try, buddy.")
                clear();
            }else{
                operate(numArr[numArr.length-1],opArr[opArr.length-1], displayValue)
                opArr = []
            }
        }

        if(button.id == 'back'){
            displayValue = displayValue.substring(0, displayValue.length - 1);
            display.innerHTML = displayValue;
        }

        if(button.id == 'clear'){
            clear();
        } else if (button.innerHTML != '=' && button.id != 'back'){
            numArr.push(displayValue)
            opArr.push(button.innerHTML)
        }

        if(opArr.length > 1 && button.innerHTML != '=' && button.id != 'back'){
            operate(numArr[numArr.length-2],opArr[opArr.length-2], displayValue)
        } else if(opArr.length > 2 && button.innerHTML != '='){
            operate(numArr[numArr.length-2],opArr[opArr.length-1], displayValue)
      }

    });
  });

// KEYBOARD SUPPORT

document.onkeydown = function(e) {
    if(!isNaN(e.key)){
        updateDisplay(e.key)
    }
    numButtons.forEach(button => {
        if(e.key == button.innerHTML){
            button.style.transform = "translate(-2px,2px)";
            button.style.boxShadow = "none"
        }
        document.onkeyup = function(e) {
            numButtons.forEach(button => {
                if(e.key == button.innerHTML){
                    button.style.transform = "none";
                    button.style.boxShadow = "-2px 2px black"
                }
            })
        }
    })
}


// BASIC MATH OPERATIONS 

function add(num1,num2){
    let result = +num1 + +num2
    display.innerHTML = containDecimals(result)
    displayValue = display.innerHTML
    numArr.push(displayValue)
};

function subtract(num1,num2){
    let result = +num1 - +num2
    display.innerHTML = containDecimals(result)
    displayValue = display.innerHTML
    numArr.push(displayValue)
};

function multiply(num1,num2){
    let result = +num1 * +num2
    display.innerHTML = containDecimals(result)
    displayValue = display.innerHTML
    numArr.push(displayValue)
};

function divide(num1,num2){
    let result = +num1 / +num2
    display.innerHTML = containDecimals(result)
    displayValue = display.innerHTML
    numArr.push(displayValue)
};

// WHOLE NUMBER CHECKER
function containDecimals(value){
    if (value % 1 != 0){
        return Number((value).toFixed(4))
    } else {
        return value
    }
}

function hasDecimal(value){
    if (value.toString().indexOf(".") > -1){
        return true
    }
    return false;
}

// OPERATION FUNCTION

function operate(num1,operator,num2){
    switch(operator){
        case '+':
            return add(num1,num2)
        case '-':
            return subtract(num1,num2);
        case 'x':
            return multiply(num1,num2);
        case '÷':
            return divide(num1,num2)
    }
}



