const EXPENSES = "expenses";

class ExpensesManager {
    constructor() {
        this.expenses = [];
        this.loadData();
    }

    addExpense({category, amount}) {
        this.expenses.push({category, amount});
        this.saveData();
    }

    computeTotalExpenses() {
        const needs = this.expenses
            .filter(expense => expense.category === NEEDS)
            .reduce((sum, expense) => sum + expense.amount, 0);

        const wants = this.expenses
            .filter(expense => expense.category === WANTS)
            .reduce((sum, expense) => sum + expense.amount, 0);

        const savings = this.expenses
            .filter(expense => expense.category === SAVINGS)
            .reduce((sum, expense) => sum + expense.amount, 0);

        return { needs, wants, savings };
    }

    loadData() {
        this.expenses = JSON.parse(localStorage.getItem(EXPENSES) || "[]");
    }

    saveData() {
        localStorage.setItem(EXPENSES, JSON.stringify(this.expenses));
    }
}