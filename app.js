const $incomeInput = document.querySelector(".income-section__input");
const $saveIncomeBtn = document.querySelector(".income-section__button");

const $totalBudget = document.querySelector(".budget-section__amount");
const $needsBudget = document.querySelector(".budget-card--needs .budget-card__amount");
const $wantsBudget = document.querySelector(".budget-card--wants .budget-card__amount");
const $savingsBudget = document.querySelector(".budget-card--savings .budget-card__amount");

function formatCurrency(number) {
    return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

function setAmount($element, amount) {
    const $currencySymbol = $element.querySelector("span");
    $element.textContent = formatCurrency(amount);
    $element.appendChild($currencySymbol);
}

function handleIncomeInput() {
    const income = parseFloat($incomeInput.value);

    if (isNaN(income) || income <= 0) {
        alert("Please enter a valid income amount.");
        return;
    }

    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;

    console.log({ total: needs + wants + savings })

    setAmount($totalBudget, income);
    setAmount($needsBudget, needs);
    setAmount($wantsBudget, wants);
    setAmount($savingsBudget, savings);

    localStorage.setItem("income", income);
    localStorage.setItem("needs", needs);
    localStorage.setItem("wants", wants);
    localStorage.setItem("savings", savings);
}

$saveIncomeBtn.addEventListener("click", handleIncomeInput);
$incomeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        handleIncomeInput();
    }
});