const calculator = document.querySelector(".calc");
const display = calculator.querySelector("#display");

const numberKeys = calculator.querySelectorAll("[data-number]");
const operatorKeys = calculator.querySelectorAll("[data-operator]");

const operations = {
  sum: (a, b) => Number(a) + Number(b),
  subtraction: (a, b) => Number(a) - Number(b),
  multiplication: (a, b) => Number(a) * Number(b),
  division: (a, b) => Number(a) / Number(b),
  porcetage: (a, b) => Number(a) % Number(b),
};

let result = 0;
let currentNumber = 0; //valor que esta no display
let lastNumber = 0; // valor atual - sempre o second number
let currentOperator = null;

numberKeys.forEach((element) => {
  element.addEventListener("click", (event) => {
    if (currentNumber === 0) {
      currentNumber = event.target.dataset.number;
    } else if (lastNumber === 0 && currentNumber != 0) {
      currentNumber += event.target.dataset.number;
    } else {
      currentNumber += event.target.dataset.number;
    }

    display.value = currentNumber;
  });
});

operatorKeys.forEach((element) => {
  element.addEventListener("click", (event) => {
    const operator = event.target.dataset.operator;
    const firstNumber = result ? result : lastNumber;
    const secondNumber = currentNumber ? currentNumber : 0;
    console.log("teste", operator, firstNumber, secondNumber);
    saveCurrentNumber();
    console.log(firstNumber, "|", secondNumber);

    if (operator === "equal") {
      if (!currentOperator) {
        result = secondNumber;
      } else {
        const operation = operations[currentOperator];
        console.log("QAAA", currentOperator);
        console.log("aqwr", operation);
        console.log("sahioa", currentNumber);
        result = operation(firstNumber, secondNumber);

        currentNumber = 0;
      }
    } else if (operator === "clear") {
      clear();
    } else {
      if (currentOperator) {
        if (result && currentNumber) {
          const operation = operations[currentOperator];

          result = operation(firstNumber, secondNumber);
        } else if (currentNumber) {
          result = currentNumber;
        }
      }

      currentOperator = operator;
    }

    if (result) {
      display.value = result;
    }
  });
});

function clear() {
  result = 0;
  currentNumber = 0;
  currentOperator = null;
  display.value = 0;
}

function saveCurrentNumber() {
  lastNumber = currentNumber;
  currentNumber = 0;
}
