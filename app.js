const $incomeInput = document.querySelector(".income-section__input");
const $saveIncomeBtn = document.querySelector(".income-section__button");
const $totalBudget = document.querySelector(".budget-section__amount");
const $needsBudget = document.querySelector(".budget-card--needs .budget-card__amount");
const $wantsBudget = document.querySelector(".budget-card--wants .budget-card__amount");
const $savingsBudget = document.querySelector(".budget-card--savings .budget-card__amount");

function setAmount($element, amount) {
    const $currencySymbol = $element.querySelector("span");
    $element.textContent = formatCurrency(amount);
    $element.appendChild($currencySymbol);
}

function renderBudget({ income, needs, wants, saving }) {
    setAmount($totalBudget, income);
    setAmount($needsBudget, needs);
    setAmount($wantsBudget, wants);
    setAmount($savingsBudget, saving);
}

function handleIncomeInput(budgetManager) {
    const income = parseFloat($incomeInput.value);

    if (isNaN(income) || income <= 0) {
        alert("Please enter a valid income amount.");
        return;
    }

    budgetManager.setIncome(income);
    budgetManager.saveData();
}

function main() {
    const budgetManager = new BudgetManager(renderBudget);
    budgetManager.loadData();

    $saveIncomeBtn.addEventListener("click", () => handleIncomeInput(budgetManager));
    $incomeInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleIncomeInput(budgetManager);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    main();
})