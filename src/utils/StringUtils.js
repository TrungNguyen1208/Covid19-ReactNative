const formatCurrency = (currency) => {
    let priceDecimalPart;
    let priceFractionalPart;
    const priceStrings = parseFloat(currency).toString().split('.');

    if (priceStrings && priceStrings.length === 1) {
        priceDecimalPart = priceStrings[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
        priceDecimalPart = priceStrings[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        priceFractionalPart = priceStrings[1].substr(0, 2);
    }
    return {
        priceDecimalPart,
        priceFractionalPart
    };
};

const isValidPassword = (password) => {
    const reg = new RegExp('^(?=.*?[A-Z]).{6,}$'); // at lease one uppercase
    return reg.test(password);
};

const isValidUsername = (username) => {
    const reg = new RegExp('^[a-zA-Z0-9]{3,20}$');
    return reg.test(username);
};

export default {
    formatCurrency,
    isValidPassword,
    isValidUsername,
}
