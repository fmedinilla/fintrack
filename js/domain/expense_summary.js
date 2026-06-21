import { BUDGET_CATEGORIES } from "../constants.js";

export function summarizeExpenses(expenses) {
    return expenses.reduce((totals, expense) => {
        if (!Object.prototype.hasOwnProperty.call(totals, expense.category)) {
            return totals;
        }

        totals[expense.category] += expense.amount;

        return totals;
    }, {
        [BUDGET_CATEGORIES.NEEDS]: 0,
        [BUDGET_CATEGORIES.WANTS]: 0,
        [BUDGET_CATEGORIES.SAVINGS]: 0
    });
}