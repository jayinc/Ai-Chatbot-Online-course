"use strict";

function calcButtons() {
  var seven = document.getElementById("btn-7");
  var eight = document.getElementById("btn-8");
  var nine = document.getElementById("btn-9");
  var div = document.getElementById("btn-divide");

  var four = document.getElementById("btn-4");
  var five = document.getElementById("btn-5");
  var six = document.getElementById("btn-6");
  var mul = document.getElementById("btn-multiply");

  var one = document.getElementById("btn-1");
  var two = document.getElementById("btn-2");
  var three = document.getElementById("btn-3");
  var min = document.getElementById("btn-minus");

  var zero = document.getElementById("btn-0");
  var point = document.getElementById("btn-dp");
  var clear = document.getElementById("btn-C");
  var plus = document.getElementById("btn-plus");

  var eq = document.getElementById("btn-equal");

  clear.onclick = function () {
    inputOperator("C");
  };

  zero.onclick = function () {
    inputNumber("0");
  };
  one.onclick = function () {
    inputNumber("1");
  };
  two.onclick = function () {
    inputNumber("2");
  };
  three.onclick = function () {
    inputNumber("3");
  };
  four.onclick = function () {
    inputNumber("4");
  };
  five.onclick = function () {
    inputNumber("5");
  };
  six.onclick = function () {
    inputNumber("6");
  };
  seven.onclick = function () {
    inputNumber("7");
  };
  eight.onclick = function () {
    inputNumber("8");
  };
  nine.onclick = function () {
    inputNumber("9");
  };
  point.onclick = function () {
    inputNumber(".");
  };

  plus.onclick = function () {
    inputOperator("+");
  };
  min.onclick = function () {
    inputOperator("-");
  };
  mul.onclick = function () {
    inputOperator("x");
  };
  div.onclick = function () {
    inputOperator("÷");
  };
  eq.onclick = function () {
    inputOperator("=");
  };
}

calcButtons();

var number = "0";
var previousNumber = "0";
var lastOperator = "";
var lastInput = "";

function inputNumber(input) {
  if (input == "." && number.indexOf(".") >= 0) {
    return input;
  } else if (number == "Infinity") {
    reset();
    return input;
  }

  if (lastInput == "=") {
    number = "0";
    previousNumber = "0";
    lastOperator = "";
  } else if (/[\+\-\x\÷]/.test(lastInput) == true) {
    number = "0";
  }

  lastInput = input;
  number = number.concat(input);
  checkExpression(input);
  updateDisplay();
}

function math(a, b, operation) {
  var num1 = parseFloat(a);
  var num2 = parseFloat(b);
  var tempResult;

  if (lastOperator == "") return b;

  switch (operation) {
    case "+":
      tempResult = num1 + num2;
      break;
    case "-":
      tempResult = num1 - num2;
      break;
    case "x":
      tempResult = num1 * num2;
      break;
    case "÷":
      tempResult = num1 / num2;
      break;
    default:
      return b;
  }

  tempResult = tempResult.toFixed(8);
  if (tempResult.indexOf(".") != -1) {
    while (tempResult.slice(-1) == "0") {
      tempResult = tempResult.slice(0, -1);
    }
  }
  if (tempResult.slice(-1) == ".") {
    tempResult = tempResult.slice(0, -1);
  }

  return tempResult;
}

function unaryOperator(input) {
  if (number == "Infinity") {
    reset();
    return input;
  }

  var tempString = "";
  var tempNumber = number;

  switch (input) {
    case "neg":
      number = (-1 * parseFloat(number)).toString();
      tempString = " neg(";
      break;

    case "sq":
      number = Math.pow(parseFloat(number), 2).toString();
      tempString = " sq(";
      break;

    case "sqrt":
      number = Math.sqrt(parseFloat(number)).toString();
      tempString = " sqrt(";
      break;

    default:
      return input;
  }

  checkExpression();
  document.getElementById("displayExpression").innerHTML =
    expression + tempString + tempNumber + ")";
  document.getElementById("main").innerHTML = number.substr(0, 12);
  return;
}

var expression = "";

function checkExpression(prevInput) {
  var numberLength = number.length;
  var firstChar = number.charAt(0);
  var secondChar = number.charAt(1);

  if (numberLength == 0 || number == undefined) {
    number = "0";
  } else if (
    firstChar == "0" &&
    isNaN(prevInput) == false &&
    secondChar != "."
  ) {
    number = number.slice(1);
  }
}
checkExpression();

var expression2 = ["", "", "", ""];
function expressionHistory(ex) {
  expression2.unshift(ex);
}

function updateDisplay() {
  document.getElementById("main").innerHTML = number.substr(0, 12);

  if (expression == "") {
    document.getElementById("displayExpression").innerHTML = "";
  } else {
    document.getElementById("displayExpression").innerHTML = expression;
  }
}
updateDisplay();

var previousNumber2 = "";

function inputOperator(input) {
  switch (input) {
    case "C":
      expression2 = ["", "", "", ""];
      reset();
      return;

    case "DEL":
      number = number.slice(0, -1);
      break;

    case "=":
      if (lastOperator == "") {
        expression = number;
      } else if (lastInput != "=") {
        previousNumber2 = number;
        expression = expression.concat(" " + number);
        var result = math(previousNumber, number, lastOperator);
        number = result;
        previousNumber = result;
      } else {
        expression = number + " " + lastOperator + " " + previousNumber2;
        number = math(number, previousNumber2, lastOperator);
      }

      expressionHistory(expression);
      expression = "";
      break;

    default:
      if (lastInput == "=") {
        expression = expression.concat(" " + number + " " + input);
        previousNumber = number;
      } else if (/[\+\-\x\÷]/.test(lastInput) == true && lastOperator != "") {
        expression = expression.slice(0, -1).concat(input);
      } else {
        expression = expression.concat(" " + number + " " + input);
        var result = math(previousNumber, number, lastOperator);
        number = result;
        previousNumber = result;
        lastOperator = input;
      }

      lastOperator = input;
      break;
  }

  lastInput = input;
  checkExpression(input);
  updateDisplay();
}

function reset() {
  number = "0";
  previousNumber = "0";
  expression = "";
  lastOperator = "";
  lastInput = "";
  updateDisplay();
}

var element = document.getElementById("calculator");
