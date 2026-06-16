const NEEDS_PERCENT = 0.5;
const WANTS_PERCENT = 0.3;
const SAVING_PERCENT = 0.2;

const INCOME = "income";
const NEEDS = "needs";
const WANTS = "wants";
const SAVINGS = "savings";

class BudgetManager {
    static NEEDS_PERCENT = 0.5;
    static WANTS_PERCENT = 0.3;
    static SAVING_PERCENT = 0.2;

    onRender = () => {
        console.log("render");
    }

    constructor(onRender) {
        this.loadData();
        this.onRender = onRender;
    }

    setIncome(income) {
        this.income = income;
        this.calculateBudget();
        this.render();
    }

    calculateBudget() {
        this.needs = this.income * BudgetManager.NEEDS_PERCENT;
        this.wants = this.income * BudgetManager.WANTS_PERCENT;
        this.saving = this.income * BudgetManager.SAVING_PERCENT;
    }

    saveData() {
        localStorage.setItem(INCOME, this.income);
        localStorage.setItem(NEEDS, this.needs);
        localStorage.setItem(WANTS, this.wants);
        localStorage.setItem(SAVINGS, this.saving);
    }

    loadData() {
        this.income = parseFloat(localStorage.getItem(INCOME) || 0);
        this.needs = parseFloat(localStorage.getItem(NEEDS) || 0);
        this.wants = parseFloat(localStorage.getItem(WANTS) || 0);
        this.saving = parseFloat(localStorage.getItem(SAVINGS) || 0);

        this.render();
    }

    render() {
        const data = this.getBudget();
        console.log(data);
        this.onRender(data);
    }

    getBudget() {
        return {
            income: this.income,
            needs: this.needs,
            wants: this.wants,
            saving: this.saving
        }
    }
}