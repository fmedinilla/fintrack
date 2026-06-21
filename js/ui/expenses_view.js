import { BUDGET_CATEGORIES } from "../constants.js";
import { formatCurrency } from "../utils.js";

const EXPENSE_CATEGORY_LABELS = {
    [BUDGET_CATEGORIES.NEEDS]: "Necesidades",
    [BUDGET_CATEGORIES.WANTS]: "Deseos",
    [BUDGET_CATEGORIES.SAVINGS]: "Ahorro"
};

export function renderExpenses($expenseListView, expenses) {
    const { list, emptyState } = $expenseListView;
    const visibleExpenses = expenses.slice().reverse();

    list.replaceChildren(...visibleExpenses.map(createExpenseItem));
    emptyState.hidden = visibleExpenses.length > 0;
    list.hidden = visibleExpenses.length === 0;
}

function createExpenseItem(expense) {
    const item = document.createElement("li");
    item.className = `expense-item expense-item--${expense.category}`;

    const category = document.createElement("span");
    category.className = "expense-item__category";
    category.textContent = EXPENSE_CATEGORY_LABELS[expense.category] ?? expense.category;

    const amount = document.createElement("span");
    amount.className = "expense-item__amount";
    amount.textContent = `${formatCurrency(expense.amount)} €`;

    item.append(category, amount);

    return item;
}