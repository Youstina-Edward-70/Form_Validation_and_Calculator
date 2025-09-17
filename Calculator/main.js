//theme toggle
const body = document.body;
const toggleBtn = document.getElementById("dn");
if (localStorage.theme) {
    body.classList.add(localStorage.theme);
} else {
    body.classList.add("light"); // default
    localStorage.theme = "light";
}
toggleBtn.checked = localStorage.theme === "light" ? true : false;

toggleBtn.addEventListener("change", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");
    localStorage.theme = body.classList.contains("dark") ? "dark" : "light";
});

// calculator
let ans = localStorage.history;

// buttons
let btns = [
    {
        id: "openParentheses",
        class: "special",
        symbol: "(",
        formula: "(",
    },
    {
        id: "closeParentheses",
        class: "special",
        symbol: ")",
        formula: ")",
    },
    {
        id: "minus-plus",
        class: "special",
        symbol: "±",
        formula: "-",
    },
    {
        id: "clear",
        class: "special",
        symbol: "C",
        formula: "false",
    },
    {
        id: "delete",
        class: "special",
        symbol: "⌫",
        formula: "false",
    },
    {
        id: "seven",
        class: "number",
        symbol: "7",
        formula: "7",
    },
    {
        id: "eight",
        class: "number",
        symbol: "8",
        formula: "8",
    },
    {
        id: "nine",
        class: "number",
        symbol: "9",
        formula: "9",
    },
    {
        id: "multiplication",
        class: "operator",
        symbol: "×",
        formula: "*",
    },
    {
        id: "division",
        class: "operator",
        symbol: "÷",
        formula: "/",
    },
    {
        id: "four",
        class: "number",
        symbol: "4",
        formula: "4",
    },
    {
        id: "five",
        class: "number",
        symbol: "5",
        formula: "5",
    },
    {
        id: "six",
        class: "number",
        symbol: "6",
        formula: "6",
    },
    {
        id: "addition",
        class: "operator",
        symbol: "+",
        formula: "+",
    },
    {
        id: "subrtaction",
        class: "operator",
        symbol: "-",
        formula: "-",
    },
    {
        id: "one",
        class: "number",
        symbol: "1",
        formula: "1",
    },
    {
        id: "two",
        class: "number",
        symbol: "2",
        formula: "2",
    },
    {
        id: "three",
        class: "number",
        symbol: "3",
        formula: "3",
    },
    {
        id: "percent",
        class: "operator",
        symbol: "%",
        formula: "%",
    },
    {
        id: "equal",
        class: "equal",
        symbol: "=",
        formula: "=",
    },
    {
        id: "zero",
        class: "number",
        symbol: "0",
        formula: "0",
    },
    {
        id: "dot",
        class: "dot",
        symbol: ".",
        formula: ".",
    },
    {
        id: "ans",
        class: "ans",
        symbol: "ans",
        formula: ans,
    },
];

let operation = document.querySelector(".operation .value");
let result = document.querySelector(".result .value");
let input = document.querySelector(".calculator .input");

function creatButtons() {
    btns.forEach((btn) => {
        input.innerHTML += `<button class=${btn.class} id=${btn.id}>
            ${btn.symbol}
        </button>`;
        // console.log(input);
    });
}
creatButtons();

const buttons = document.getElementsByTagName("button");
let data = {
    formula: [],
    operation: [],
};

// Click event
input.addEventListener("click", (e) => {
    const clickedBtn = e.target;
    // console.log(clickedBtn.id);

    btns.forEach((button) => {
        if (button.id == clickedBtn.id) calculator(button);
    });
});
// Keydown event
const keyMap = {
    "*": "×",
    "/": "÷",
    Enter: "=",
    Backspace: "⌫",
    Escape: "C",
    F9: "±",
};

document.addEventListener("keydown", (e) => {
    let key = e.key;

    if (keyMap[key]) {
        key = keyMap[key];
    }

    const button = btns.find((btn) => btn.symbol === key);

    if (button) {
        calculator(button);
        e.preventDefault();
    }
});

let check = false;
// Click function
function calculator(button) {
    if (button.class === "number") {
        if (check === true) resetCalculator();
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    } else if (button.class === "dot") {
        if (check === true) resetCalculator();
        if (data.operation.length === 0) {
            data.operation.push(0);
            data.formula.push(0);
        }
        let lastNum = data.operation.join("").match(/(\d+\.?\d*)$/);
        if (lastNum && lastNum[0].includes(".")) return;

        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    } else if (button.class === "operator") {
        if (data.operation.length === 0 || check === true) {
            data.operation = [ans];
            data.formula = [ans];
            updateResult(0);
        }
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
        check = false;
    } else if (button.class === "special") {
        if (button.id === "delete") {
            if (check === true) {
                data.operation = data.operation[0].toString().split("");
                check = false;
                updateResult(0);
            }
            console.log(data.operation);

            data.operation.pop();
            data.formula.pop();
        } else if (button.id === "clear") {
            resetCalculator();
        } else if (button.id === "minus-plus") {
            if (!data.operation.length) return;

            let opString = data.operation.join("");
            let forString = data.formula.join("");
            let match = opString.match(/(-?\d+\.?\d*)$/);
            if (match) {
                let lastNumber = match[0];
                let opBeforeLast = opString.slice(0, -lastNumber.length);
                let forBeforeLast = forString.slice(0, -lastNumber.length);
                if (lastNumber.startsWith("-")) {
                    // 123 - 456 | 123 * (-456)
                    lastNumber =
                        (/\d$/.test(opBeforeLast) ? "+" : "") + lastNumber.slice(1);
                } else if (opBeforeLast.endsWith("+")) {
                    // 123 + 456
                    opBeforeLast = opBeforeLast.slice(0, -1) + "-";
                    forBeforeLast = forBeforeLast.slice(0, -1) + "-";
                } else {
                    // 123 * 456
                    lastNumber = "-" + lastNumber;
                }

                opString = opBeforeLast + lastNumber;
                forString = forBeforeLast + lastNumber;

                data.operation = opString.split("");
                data.formula = forString.split("");
                updateOperation(opString);
            }
        } else {
            // ( | )
            if (check === true) resetCalculator();
            data.operation.push(button.symbol);
            data.formula.push(button.formula);
        }
    } else if (button.class === "ans") {
        let lastAns = localStorage.history || 0;
        data.operation.push(lastAns);
        data.formula.push(lastAns);
    } else if (button.class === "equal") {
        let formula = data.formula.join("");
        let result;
        try {
            result = eval(formula);
        } catch (error) {
            if (error instanceof SyntaxError) {
                result = "Syntax Error!";
                updateResult(result);
                return;
            }
        }
        localStorage.history = result;
        ans = result;
        data.operation = [result];
        data.formula = [result];
        check = true;

        updateResult(result);
        return;
    }

    updateOperation(data.operation.join(""));
}

// Update output
function updateOperation(operationData) {
    operation.innerHTML = operationData;
}
function updateResult(resultData) {
    result.innerHTML = resultData;
}
// Reset
function resetCalculator() {
    data.operation = [];
    data.formula = [];
    check = false;
    updateResult(0);
}
