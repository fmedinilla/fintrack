export function formatCurrency(number) {
    return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

export function parsePositiveNumber(value) {
    const number = Number.parseFloat(value);

    if (!Number.isFinite(number) || number <= 0) {
        return null;
    }

    return number;
}