import { Easing } from "react-native";
import "./scss/main.scss";
const mathDisplayPara = document.querySelector(
  ".mathDisplayPara"
) as HTMLParagraphElement;
let toggleOperator: boolean = false;
let firstNum: string = "";
let secondNum: string = "";
let operatorValue1: string = "";
let temporaryOperator: string = "";

function toggleThemeListner() {
  const theme = document.querySelector(".theme-card") as HTMLDivElement;
  theme.addEventListener("click", () => {
    const container = document.querySelector("#container");
    const light = document.querySelector(".light") as HTMLImageElement;
    const dark = document.querySelector(".dark") as HTMLImageElement;
    container?.classList.toggle("light-mode");

    if (container?.classList.contains("light-mode")) {
      // Om ljusläge är aktivt, byt till mörkt läge
      light.src = "src/img/sun-dark.png";
      dark.src = "src/img/moon-dark.png";
      dark.classList.add("opacity");
      light.classList.remove("opacity");
    } else {
      // Om mörkt läge är aktivt, byt till ljust läge
      light.src = "src/img/sun.png";
      dark.src = "src/img/moon2.png";
      light.classList.add("opacity");
      dark.classList.remove("opacity");
    }
  });
}

function numbersListner() {
  let number = document.querySelectorAll<HTMLButtonElement>(".number");
  number.forEach((numbers) => {
    numbers.addEventListener("click", (e) => {
      const numberValue = (e.target as HTMLButtonElement).getAttribute(
        "data-value"
      );
      if (numberValue !== null) {
        if (toggleOperator === false) {
          firstNum += numberValue;
          console.log("FirstNum " + firstNum);
        } else if (toggleOperator === true) {
          secondNum += numberValue;
          console.log("SecondNum: " + secondNum);
        }

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
          if (secondNum.length !== 0 && toggleOperator === true) {
            calculate(firstNum, operatorValue1, secondNum);
          }
          operatorValue1 = operatorValue;
          toggleOperator = true;
          console.log(operatorValue1);
        }
      }
    });
  });
}

function handleFalseOperator(newOperator: string) {
  if (firstNum.length === 0) {
    mathDisplayPara.innerText = "*Error* Cannot use operator before value";
  }

  const displayText = mathDisplayPara.innerText;
  const updatedDisplayText = displayText.slice(0, -2) + " " + newOperator + " ";
  mathDisplayPara.innerText = updatedDisplayText;
  operatorValue1 = newOperator;
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
  }

  console.log(sum);
  secondNum = "";
  firstNum = sum.toString();
  mathDisplayPara.innerText = `${firstNum} `;
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
  const remove = document.querySelector(".remove") as HTMLElement;
  remove.addEventListener("click", (e) => {
    const button = (e.target as HTMLElement).closest(
      "button"
    ) as HTMLButtonElement;
    if (button) {
      let currentValue = mathDisplayPara.innerText;
      mathDisplayPara.innerText = currentValue.slice(0, -1);
    }
  });
}

equalBtnListner();
clear();
removeBtnListner();
operatorsListner();
numbersListner();
toggleThemeListner();

// if (toggleOperator === true && secondNum.length !== 0) {
//   console.log("Firstnum: " + firstNum);
//   console.log("secondNum: " + secondNum);
//   console.log("operator: " + operatorValue);
//   console.log("Uträkning: " + firstNum, operatorValue1, secondNum);
//   calculate(firstNum, operatorValue1, secondNum);
//   console.log(operatorValue1);
// } else if (toggleOperator === true && secondNum.length === 0) {
//   handleFalseOperator(operatorValue);
// } else if (firstNum.length === 0) {
//   handleFalseOperator(operatorValue);
// } else {
//   console.log("balle");
//   toggleOperator = true;
//   operatorValue1 = operatorValue;
//   updateDisplay(" " + operatorValue + " ");
// }
