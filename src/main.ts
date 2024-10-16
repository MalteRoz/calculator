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
let lastResult: number | null = null;
let currentOperator: string | null = null;
let waitingForSecondOperand: boolean = false;
let lastInputWasOperator = false;

function removeBtnListner() {
  remove.addEventListener("click", (e) => {
    const button = (e.target as HTMLElement).closest(
      "button"
    ) as HTMLButtonElement;
    if (button) {
      let currentValue = mathDisplayPara.innerHTML;
      mathDisplayPara.innerHTML = currentValue.slice(0, -1);
      currentExpression = currentExpression.slice(0, -1);
      console.log(currentExpression);
    }
  });
}

function clearBTNListner() {
  clear.addEventListener("click", () => {
    mathDisplayPara.textContent = "";
    resultsDisplayPara.textContent = "";
    currentExpression = "";
    lastResult = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    lastInputWasOperator = false;
  });
}

function operatorsListner() {
  operator.forEach((operators) => {
    operators.addEventListener("click", (e) => {
      const button = (e.target as HTMLElement).closest(
        "button"
      ) as HTMLButtonElement;

      if (button) {
        const operatorValue = button.getAttribute("data-value");
        if (operatorValue !== null) {
          if (lastInputWasOperator) {
            updateDisplay("Wrong Format! Cannot add two operators in a row.");
            return;
          }
          if (lastResult === null) {
            lastResult = parseFloat(currentExpression.trim()); // Om det är första operanden
          } else if (waitingForSecondOperand) {
            // Beräkna med tidigare operatör
            lastResult = calculate(
              lastResult,
              currentExpression.trim(),
              currentOperator!
            );
            resultsDisplayPara.textContent = lastResult.toString();
          }

          // Uppdatera operatören och förbered för nästa operand
          currentOperator = operatorValue;
          currentExpression = "";
          waitingForSecondOperand = true;
          lastInputWasOperator = true;
          updateDisplay(`${lastResult} ${currentOperator}`);
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
        lastInputWasOperator = false;
        currentExpression += value;
        updateDisplay(currentExpression);
      }
    });
  });
}

function evalBtnListner() {
  equal.addEventListener("click", () => {
    console.log("Current Expression before calculation:", currentExpression);
    const result = calculate();
    console.log("Result:", result);
  });
}

function updateDisplay(expression: string) {
  mathDisplayPara.textContent = expression;
}

function calculate(
  leftOperand: string | number,
  rightOperand: string,
  operator: string
): number {
  const left =
    typeof leftOperand === "string" ? parseFloat(leftOperand) : leftOperand;
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

evalBtnListner();
operatorsListner();
numbersListner();
removeBtnListner();
clearBTNListner();
