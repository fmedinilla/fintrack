import { BUDGET_CATEGORIES } from "./constants.js";
import { parsePositiveNumber } from "./utils.js";
import { IncomeRepository } from "./repositories/income_repository.js";
import { ExpensesRepository } from "./repositories/expenses_repository.js";
import { BudgetService } from "./services/budget_service.js";
import { ExpensesService } from "./services/expenses_service.js";
import { renderBudget } from "./ui/budget_view.js";
import { renderExpenseHistory, renderExpenseSummary, renderExpenseStats } from "./ui/expenses_view.js";
import { setupExpenseTabs } from "./ui/expenses_tabs_controller.js";

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
const $expenseListView = {
    list: document.querySelector(".expense-list"),
    emptyState: document.querySelector(".expense-list__empty")
};
const $expenseSummaryView = document.querySelector(".expense-summary");
const $expenseStatsView = document.querySelector(".expense-stats");
const $expenseTabs = document.querySelectorAll("[data-expense-tab]");
const $expensePanels = document.querySelectorAll("[data-expense-panel]");
const incomeRepository = new IncomeRepository();
const expensesRepository = new ExpensesRepository();
const budgetService = new BudgetService(incomeRepository);
const expensesService = new ExpensesService(expensesRepository);

function renderDashboard() {
    const budget = budgetService.getBudget(expensesService.expenses);
    renderBudget($budgetView, budget);
    renderExpenseHistory($expenseListView, expensesService.expenses);
    renderExpenseSummary($expenseSummaryView, expensesService.expenses);
    renderExpenseStats($expenseStatsView, expensesService.expenses);
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
    const currentBudget = budgetService.getBudget(expensesService.expenses);

    if (amount === null || !Object.values(BUDGET_CATEGORIES).includes(category)) {
        alert("Please enter a valid expense amount.");
        return;
    }

    if (amount > currentBudget[category]) {
        alert(`El gasto supera el presupuesto disponible para ${category}. La categoría se mostrará en rojo.`);
    }

    expensesService.addExpense({ category, amount });
    $expenseAmountInput.value = "";
    renderDashboard();
}

function bootstrap() {
    budgetService.load();
    expensesService.load();

    setupExpenseTabs($expenseTabs, $expensePanels);
    $incomeForm.addEventListener("submit", handleIncomeSubmit);
    $expensesForm.addEventListener("submit", handleExpenseSubmit);

    renderDashboard();
}

document.addEventListener("DOMContentLoaded", bootstrap);