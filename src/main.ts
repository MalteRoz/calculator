import "./scss/main.scss";
import { toggleThemeListner } from "./TS/theme";

const mathDisplayPara = document.querySelector(
  ".mathDisplayPara"
) as HTMLParagraphElement;
const resultsDisplayPara = document.querySelector(
  ".resultsDisplayPara"
) as HTMLParagraphElement;
let toggleOperator: boolean = false;
let firstNum: string = "";
let secondNum: string = "";
let operatorValue1: string = "";

function numbersListner() {
  let number = document.querySelectorAll<HTMLButtonElement>(".number");
  number.forEach((numbers) => {
    numbers.addEventListener("click", (e) => {
      const numberValue = (e.target as HTMLButtonElement).getAttribute(
        "data-value"
      );
      if (numberValue !== null) {
        if (numberValue === ".") {
          if (toggleOperator === false && firstNum.includes(".")) {
            console.log("err - multiple dots in firstNum");
            return;
          } else if (toggleOperator === true && secondNum.includes(".")) {
            console.log("err - multiple dots in secondNum");
            return;
          }
        }

        toggleOperator === false
          ? (firstNum += numberValue)
          : (secondNum += numberValue);

        updateDisplay(numberValue);
        clear();
      }
    });
  });
}

function operatorsListner() {
  let operator = document.querySelectorAll<HTMLButtonElement>(".operator");
  operator.forEach((operators) => {
    operators.addEventListener("click", (e) => {
      const button = (e.target as HTMLElement).closest(
        "button"
      ) as HTMLButtonElement;

      if (button) {
        const operatorValue = button.getAttribute("data-value");
        if (operatorValue !== null) {
          handleFalseOperator(firstNum, operatorValue1);

          if (secondNum.length !== 0 && toggleOperator === true) {
            calculate(firstNum, operatorValue1, secondNum);
          }

          operatorValue1 = operatorValue;
          toggleOperator = true;

          updateDisplay(operatorValue1);
        }
      }
    });
  });
}

function handleFalseOperator(num: string, operator: string) {
  if (num.length === 0) {
    mathDisplayPara.innerText = "*Error* Cannot use operator before value";
  } else if (operator.length !== 0) {
    operatorValue1 = operator;
    console.log(operatorValue1);
  }
}

function calculate(expression1: string, operator: string, expression2: string) {
  let first = parseFloat(expression1);
  let second = parseFloat(expression2);
  let sum: number = 0;
  switch (operator) {
    case "+":
      sum = first + second;
      break;
    case "-":
      sum = first - second;
      break;
    case "*":
      sum = first * second;
      break;
    case "/":
      sum = first / second;
      break;
    case "^":
      sum = first ** second;
  }

  console.log(sum);
  secondNum = "";
  firstNum = sum.toFixed(2);

  if (firstNum.endsWith(".00")) {
    firstNum = parseFloat(firstNum).toString();
  }

  mathDisplayPara.innerText = `${firstNum}`;
  resultsDisplayPara.innerText = `${firstNum}`;
}

function updateDisplay(expression: string) {
  mathDisplayPara.innerText += expression;
}

function clear() {
  const clearBtn = document.querySelector(".clear") as HTMLButtonElement;
  const resultsDisplayPara = document.querySelector(
    ".resultsDisplayPara"
  ) as HTMLButtonElement;

  clearBtn.addEventListener("click", () => {
    mathDisplayPara.innerText = "";
    resultsDisplayPara.innerText = "";
    firstNum = "";
    secondNum = "";
    operatorValue1 = "";
    toggleOperator = false;
  });
}

function equalBtnListner() {
  const equalBtn = document.querySelector(".equal") as HTMLButtonElement;
  equalBtn.addEventListener("click", () => {
    if (
      firstNum.length !== 0 &&
      secondNum.length !== 0 &&
      toggleOperator === true
    ) {
      console.log(firstNum, operatorValue1, secondNum);
      calculate(firstNum, operatorValue1, secondNum);
    }
  });
}

function removeBtnListner() {
  const remove = document.querySelector(".remove") as HTMLButtonElement;
  remove.addEventListener("click", () => {
    if (toggleOperator === false && firstNum.length > 0) {
      firstNum = firstNum.slice(0, -1);
      mathDisplayPara.innerText = firstNum;
      console.log(firstNum);
    } else if (toggleOperator === true && secondNum.length > 0) {
      secondNum = secondNum.slice(0, -1);
      mathDisplayPara.innerText = `${firstNum}${operatorValue1}${secondNum}`;
    }
  });
}

equalBtnListner();
clear();
removeBtnListner();
operatorsListner();
numbersListner();
toggleThemeListner();
