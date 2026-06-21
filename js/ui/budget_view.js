import { formatCurrency } from "../utils.js";

export function renderBudget($budgetView, budget) {
    setAmount($budgetView.totalBudget, budget.income);
    setAmount($budgetView.needsBudget, budget.needs);
    setAmount($budgetView.wantsBudget, budget.wants);
    setAmount($budgetView.savingsBudget, budget.saving);
}

function setAmount($element, amount) {
    const $currencySymbol = $element.querySelector("span");

    $element.textContent = formatCurrency(amount);
    $element.appendChild($currencySymbol);
}