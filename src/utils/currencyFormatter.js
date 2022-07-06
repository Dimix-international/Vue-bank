
export const currencyFormatter = (value) => {
    return new Intl.NumberFormat('ru-Ru', {
        currency: 'RUB',
        style: 'currency'
    }).format(value);
}