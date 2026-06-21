import { BUDGET_CATEGORIES } from "../constants.js";
import { formatCurrency } from "../utils.js";
import { calculateExpenseInsights } from "../domain/expense_insights.js";

const EXPENSE_CATEGORY_LABELS = {
    [BUDGET_CATEGORIES.NEEDS]: "Necesidades",
    [BUDGET_CATEGORIES.WANTS]: "Deseos",
    [BUDGET_CATEGORIES.SAVINGS]: "Ahorro"
};

export function renderExpenseHistory($expenseListView, expenses) {
    const { list, emptyState } = $expenseListView;
    const visibleExpenses = expenses.slice().reverse();

    list.replaceChildren(...visibleExpenses.map(createExpenseItem));
    emptyState.hidden = visibleExpenses.length > 0;
    list.hidden = visibleExpenses.length === 0;
}

export function renderExpenseSummary($container, expenses) {
    const insights = calculateExpenseInsights(expenses);

    $container.replaceChildren(...insights.categoryEntries.map(createSummaryCard));

    if (insights.categoryEntries.length === 0) {
        $container.append(createEmptyState("Todavía no hay gastos para resumir."));
    }
}

export function renderExpenseStats($container, expenses) {
    const insights = calculateExpenseInsights(expenses);

    $container.replaceChildren(
        createStatCard("Total gastado", formatCurrency(insights.totalSpent), "Suma de todos los gastos", "highlight"),
        createStatCard("Cantidad de gastos", String(insights.count), "Registros en total", "neutral"),
        createStatCard("Gasto mínimo", formatCurrency(insights.min), insights.smallestExpense ? labelExpense(insights.smallestExpense) : "Sin registros", "success"),
        createStatCard("Gasto máximo", formatCurrency(insights.max), insights.largestExpense ? labelExpense(insights.largestExpense) : "Sin registros", "danger"),
        createStatCard("Media", formatCurrency(insights.average), "Promedio por gasto", "highlight"),
        createStatCard("Mediana", formatCurrency(insights.median), "Valor central de los montos", "neutral"),
        createStatCard("Categoría con más gasto", insights.topCategory ? `${insights.topCategory.label} · ${formatCurrency(insights.topCategory.amount)}` : "Sin registros", "Mayor acumulado por categoría", "warning"),
        createStatCard("Categoría con menos gasto", insights.bottomCategory ? `${insights.bottomCategory.label} · ${formatCurrency(insights.bottomCategory.amount)}` : "Sin registros", "Menor acumulado por categoría", "success")
    );

    if (insights.count === 0) {
        $container.append(createEmptyState("Todavía no hay gastos para analizar."));
    }
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

function createSummaryCard(entry) {
    const card = document.createElement("article");
    const isOverBudget = entry.amount < 0;
    card.className = `expense-summary-card expense-summary-card--${entry.category}${isOverBudget ? " expense-summary-card--over-budget" : ""}`;

    const label = document.createElement("span");
    label.className = "expense-summary-card__label";
    label.textContent = entry.label;

    const amount = document.createElement("strong");
    amount.className = "expense-summary-card__amount";
    amount.textContent = formatCurrency(entry.amount);
    amount.classList.toggle("expense-summary-card__amount--negative", isOverBudget);

    const meta = document.createElement("span");
    meta.className = "expense-summary-card__meta";
    meta.textContent = `Acumulado en esta categoría`;

    card.append(label, amount, meta);

    return card;
}

function createStatCard(title, amount, meta, tone = "neutral") {
    const card = document.createElement("article");
    card.className = `expense-stat-card expense-stat-card--${tone}`;

    const label = document.createElement("span");
    label.className = "expense-stat-card__label";
    label.textContent = title;

    const value = document.createElement("strong");
    value.className = "expense-stat-card__amount";
    value.textContent = amount;

    const details = document.createElement("span");
    details.className = "expense-stat-card__meta";
    details.textContent = meta;

    card.append(label, value, details);

    return card;
}

function createEmptyState(message) {
    const empty = document.createElement("p");
    empty.className = "expense-list__empty";
    empty.textContent = message;
    return empty;
}

function labelExpense(expense) {
    return `${formatCurrency(expense.amount)} €`;
}