import { BUDGET_ALLOCATION } from "../constants.js";
import { summarizeExpenses } from "./expense_summary.js";

export function calculateBudget(income, expenses = []) {
    const baseBudget = {
        income,
        needs: income * BUDGET_ALLOCATION.needs,
        wants: income * BUDGET_ALLOCATION.wants,
        saving: income * BUDGET_ALLOCATION.savings
    };

    const expenseTotals = summarizeExpenses(expenses);

    return {
        ...baseBudget,
        needs: baseBudget.needs - expenseTotals.needs,
        wants: baseBudget.wants - expenseTotals.wants,
        saving: baseBudget.saving - expenseTotals.savings
    };
}