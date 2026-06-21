import { calculateBudget } from "../domain/budget_calculator.js";

export class BudgetService {
    constructor(incomeRepository) {
        this.incomeRepository = incomeRepository;
        this.income = 0;
    }

    load() {
        this.income = this.incomeRepository.load();
        return this.getBudget();
    }

    setIncome(income) {
        this.income = income;
        this.incomeRepository.save(income);

        return this.getBudget();
    }

    getBudget(expenses = []) {
        return calculateBudget(this.income, expenses);
    }
}