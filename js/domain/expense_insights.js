import { BUDGET_CATEGORIES } from "../constants.js";
import { summarizeExpenses } from "./expense_summary.js";

const CATEGORY_LABELS = {
    [BUDGET_CATEGORIES.NEEDS]: "Necesidades",
    [BUDGET_CATEGORIES.WANTS]: "Deseos",
    [BUDGET_CATEGORIES.SAVINGS]: "Ahorro"
};

export function calculateExpenseInsights(expenses) {
    const count = expenses.length;
    const amounts = expenses.map(expense => expense.amount).sort((a, b) => a - b);
    const totalSpent = amounts.reduce((sum, amount) => sum + amount, 0);
    const average = count === 0 ? 0 : totalSpent / count;
    const median = calculateMedian(amounts);
    const min = count === 0 ? 0 : amounts[0];
    const max = count === 0 ? 0 : amounts[amounts.length - 1];
    const categoryTotals = summarizeExpenses(expenses);
    const categoryEntries = Object.entries(categoryTotals).map(([category, amount]) => ({
        category,
        label: CATEGORY_LABELS[category] ?? category,
        amount
    }));
    const topCategory = count === 0 ? null : categoryEntries.reduce((best, current) => current.amount > best.amount ? current : best, categoryEntries[0]);
    const bottomCategory = count === 0 ? null : categoryEntries.reduce((worst, current) => current.amount < worst.amount ? current : worst, categoryEntries[0]);

    return {
        count,
        totalSpent,
        average,
        median,
        min,
        max,
        categoryTotals,
        categoryEntries,
        topCategory,
        bottomCategory,
        largestExpense: count === 0 ? null : expenses.reduce((largest, current) => current.amount > largest.amount ? current : largest, expenses[0]),
        smallestExpense: count === 0 ? null : expenses.reduce((smallest, current) => current.amount < smallest.amount ? current : smallest, expenses[0])
    };
}

function calculateMedian(sortedAmounts) {
    if (sortedAmounts.length === 0) {
        return 0;
    }

    const middleIndex = Math.floor(sortedAmounts.length / 2);

    if (sortedAmounts.length % 2 === 1) {
        return sortedAmounts[middleIndex];
    }

    return (sortedAmounts[middleIndex - 1] + sortedAmounts[middleIndex]) / 2;
}