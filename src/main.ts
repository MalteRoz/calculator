import "./scss/main.scss";

let operator = document.querySelectorAll<HTMLButtonElement>(".operator");
let number = document.querySelectorAll<HTMLButtonElement>(".number");
let mathDisplayPara = document.querySelector(
  ".mathDisplayPara"
) as HTMLParagraphElement;
let resultsDisplayPara = document.querySelector(
  ".resultsDisplayPara"
) as HTMLButtonElement;
let remove = document.querySelector(".remove") as HTMLButtonElement;
let clear = document.querySelector(".clear") as HTMLButtonElement;
let equal = document.querySelector(".equal") as HTMLButtonElement;
let currentExpression: string = "";

function removeBtnListner() {
  remove.addEventListener("click", (e) => {
    const button = (e.target as HTMLElement).closest(
      "button"
    ) as HTMLButtonElement;
    if (button) {
      let currentValue = mathDisplayPara.innerHTML;
      mathDisplayPara.innerHTML = currentValue.slice(0, -1);
    }
  });
}

function clearBTNListner() {
  clear.addEventListener("click", () => {
    mathDisplayPara.textContent = "";
    resultsDisplayPara.textContent = "";
    currentExpression = "";
  });
}

function operatorsListner() {
  operator.forEach((operators) => {
    operators.addEventListener("click", (e) => {
      const button = (e.target as HTMLElement).closest(
        "button"
      ) as HTMLButtonElement;
      if (button) {
        const value = button.getAttribute("data-value");
        if (value !== null) {
          if (currentExpression.length === 0) {
            mathDisplayPara.innerText =
              "*Error* Cannot add operator on empty value.";
            return;
          }

          const lastChar = currentExpression[currentExpression.length - 1];
          const operators = ["%", "/", "*", "-", "+"];

          if (operators.includes(lastChar)) {
            alert("wrong format");
          } else {
            currentExpression += ` ${value} `;
            updateDisplay(currentExpression);
          }
        }
      }
    });
  });
}

function numbersListner() {
  number.forEach((numbers) => {
    numbers.addEventListener("click", (e) => {
      const value = (e.target as HTMLButtonElement).getAttribute("data-value");
      if (value !== null) {
        currentExpression += ` ${value} `;
        updateDisplay(currentExpression);
      }
    });
  });
}

function evalBtnListner() {
  equal.addEventListener("click", () => {
    console.log("Current Expression before calculation:", currentExpression);
    const result = calculate(currentExpression);
    console.log("Result:", result);
  });
}

function updateDisplay(expression: string) {
  mathDisplayPara.textContent = expression;
}

function calculate(expression: string) {
  const parts = expression.match(/\d+|[+\-*/]/g);

  console.log("Parts after splitting:", parts);

  if (!parts || parts.length < 3 || parts.length % 2 === 0) {
    alert("Ogiltigt uttrycksformat. Försök med 'tal operator tal'.");
    return NaN;
  }

  const [leftOperand, operator, rightOperand] = parts;

  console.log("Left Operand:", leftOperand);
  console.log("Operator:", operator);
  console.log("Right Operand:", rightOperand);

  const left = parseFloat(leftOperand);
  const right = parseFloat(rightOperand);

  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    default:
      throw new Error("Ogiltig operator");
  }
}

function sortExpression(expression: string) {}

evalBtnListner();
operatorsListner();
numbersListner();
removeBtnListner();
clearBTNListner();
