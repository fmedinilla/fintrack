import { STORAGE_KEYS } from "../constants.js";
import { LocalStorageRepository } from "../infrastructure/local_storage_repository.js";

export class ExpensesRepository {
    constructor() {
        this.repository = new LocalStorageRepository(STORAGE_KEYS.expenses, () => []);
    }

    load() {
        return this.repository.load();
    }

    save(expenses) {
        this.repository.save(expenses);
    }

    clear() {
        this.repository.clear();
    }
}