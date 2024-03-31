function isNumber(input) {
  return !isNaN(Number(input));
}

function isOperator(input) {
  return ["increment", "subtract", "multiply", "divide"].includes(input);
}

function isDot(input) {
  return input === "dot";
}

function isReset(input) {
  return input === "reset";
}

function isEqual(input) {
  return input === "equal";
}

function writeTextToResult(text) {
  const element = document.getElementById("result")
  if (!element) {
    return
  }

  element.innerText = text || "0";
}


class Calculator {
  constructor() {
    this.currentInput = ""
    this.currentOperator = ""
    this.total = 0;
  }

  setCurrentInput(number) {
    this.currentInput = number;
  }

  setCurrentOperator(operator) {
    this.currentOperator = operator;
  }

  increment(number) {
    this.total += isNaN(Number(number)) ? 0 : Number(number);
  }

  subtract(number) {
    this.total -= isNaN(Number(number)) ? 0 : Number(number);
  }

  multiply(number) {
    if (isNaN(Number(number))) {
      return;
    }

    this.total = (this.total || 1) * Number(number);
  }

  divide(number) {
    if (isNaN(Number(number))) {
      return;
    }

    if (this.total === 0) {
      this.total = Number(number);
      return;
    }

    this.total /= (isNaN(Number(number)) ? 0 : Number(number));
  }

  reset() {
    this.total = 0;
    this.currentInput = "";
    this.currentOperator = "";
  }
}


document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".calculator button");

  const calculator = new Calculator();

  function handleButtonClick(event) {
    const button = event.target;
    const buttonValue = button.getAttribute("data-value")

    if (isNumber(buttonValue)) {
      calculator.setCurrentInput(`${calculator.currentInput}${buttonValue}`)
      writeTextToResult(calculator.currentInput)
    }

    /**
     * 66666
     * +
     * // clear input in memory (html still visible)
     * 7777
     * x
     * // clear input in memory (html still visible)
     */

    if (isOperator(buttonValue)) {
      if (!calculator.currentInput && !calculator.total) return

      const currentInput = calculator.currentInput // string
      calculator.setCurrentOperator(buttonValue)

      switch (buttonValue) {
        case "increment":
          calculator.increment(currentInput)
          break;
        case "subtract":
          calculator.subtract(currentInput)
          break;
        case "multiply":
          calculator.multiply(currentInput)
          break;
        case "divide":
          calculator.divide(currentInput)
          break;
      }

      calculator.setCurrentInput("")
      writeTextToResult(calculator.total)
    }

    if (isDot(buttonValue)) {

    }

    if (isReset(buttonValue)) {
      calculator.reset();
      writeTextToResult(calculator.currentInput)
    }

    if (isEqual(buttonValue)) {
      switch (calculator.currentOperator) {
        case "increment":
          calculator.increment(calculator.currentInput)
          break;
        case "subtract":
          calculator.subtract(calculator.currentInput)
          break;
        case "multiply":
          calculator.multiply(calculator.currentInput)
          break;
        case "divide":
          calculator.divide(calculator.currentInput)
          break;
      }

      calculator.setCurrentOperator("")
      calculator.setCurrentInput("")
      writeTextToResult(calculator.total)
    }
  }

  for (const button of buttons) {
    button.addEventListener("click", handleButtonClick);
  }
});

window.onunload = function () {
}



