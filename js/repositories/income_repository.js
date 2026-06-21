import { STORAGE_KEYS } from "../constants.js";
import { LocalStorageRepository } from "../infrastructure/local_storage_repository.js";

export class IncomeRepository {
    constructor() {
        this.repository = new LocalStorageRepository(STORAGE_KEYS.income, () => 0, {
            serialize: (value) => String(value),
            deserialize: (value) => Number.parseFloat(value) || 0
        });
    }

    load() {
        return this.repository.load();
    }

    save(income) {
        this.repository.save(income);
    }

    clear() {
        this.repository.clear();
    }
}