export class ExpensesService {
    constructor(expensesRepository) {
        this.expensesRepository = expensesRepository;
        this.expenses = [];
    }

    load() {
        this.expenses = this.expensesRepository.load();
        return this.expenses;
    }

    addExpense(expense) {
        this.expenses = [...this.expenses, expense];
        this.expensesRepository.save(this.expenses);

        return this.expenses;
    }
}