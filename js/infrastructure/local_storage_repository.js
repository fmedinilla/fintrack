export class LocalStorageRepository {
    constructor(storageKey, defaultValueFactory, { serialize = JSON.stringify, deserialize = JSON.parse } = {}) {
        this.storageKey = storageKey;
        this.defaultValueFactory = defaultValueFactory;
        this.serialize = serialize;
        this.deserialize = deserialize;
    }

    load() {
        const rawValue = localStorage.getItem(this.storageKey);

        if (rawValue === null) {
            return this.defaultValueFactory();
        }

        try {
            return this.deserialize(rawValue);
        } catch {
            return this.defaultValueFactory();
        }
    }

    save(value) {
        localStorage.setItem(this.storageKey, this.serialize(value));
    }

    clear() {
        localStorage.removeItem(this.storageKey);
    }
}