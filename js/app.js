import { BUDGET_CATEGORIES } from "./constants.js";
import { parsePositiveNumber } from "./utils.js";
import { IncomeRepository } from "./repositories/income_repository.js";
import { ExpensesRepository } from "./repositories/expenses_repository.js";
import { BudgetService } from "./services/budget_service.js";
import { ExpensesService } from "./services/expenses_service.js";
import { renderBudget } from "./ui/budget_view.js";

const $incomeForm = document.querySelector(".income-section__container");
const $incomeInput = document.querySelector(".income-section__input");
const $expensesForm = document.querySelector(".expenses-form");
const $expenseCategorySelect = document.querySelector(".expenses-form__select");
const $expenseAmountInput = document.querySelector(".expenses-form__input");
const $budgetView = {
    totalBudget: document.querySelector(".budget-section__amount"),
    needsBudget: document.querySelector(".budget-card--needs .budget-card__amount"),
    wantsBudget: document.querySelector(".budget-card--wants .budget-card__amount"),
    savingsBudget: document.querySelector(".budget-card--savings .budget-card__amount")
};
const incomeRepository = new IncomeRepository();
const expensesRepository = new ExpensesRepository();
const budgetService = new BudgetService(incomeRepository);
const expensesService = new ExpensesService(expensesRepository);

function renderDashboard() {
    const budget = budgetService.getBudget(expensesService.expenses);
    renderBudget($budgetView, budget);
}

function handleIncomeSubmit(event) {
    event.preventDefault();

    const income = parsePositiveNumber($incomeInput.value);

    if (income === null) {
        alert("Please enter a valid income amount.");
        return;
    }

    budgetService.setIncome(income);
    $incomeInput.value = "";
    renderDashboard();
}

function handleExpenseSubmit(event) {
    event.preventDefault();

    const category = $expenseCategorySelect.value;
    const amount = parsePositiveNumber($expenseAmountInput.value);

    if (amount === null || !Object.values(BUDGET_CATEGORIES).includes(category)) {
        alert("Please enter a valid expense amount.");
        return;
    }

    expensesService.addExpense({ category, amount });
    $expenseAmountInput.value = "";
    renderDashboard();
}

function bootstrap() {
    budgetService.load();
    expensesService.load();

    $incomeForm.addEventListener("submit", handleIncomeSubmit);
    $expensesForm.addEventListener("submit", handleExpenseSubmit);

    renderDashboard();
}

document.addEventListener("DOMContentLoaded", bootstrap);