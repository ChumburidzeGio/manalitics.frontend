import { getRandomInt } from './helpers';

export const generateTransactionCollection = (page, amount) => {
    const from = (page - 1) * amount;
    const to = page * amount;
    let data = [];

    for (let i = from; i < to; i++) {
        data.push(generateTransaction(i));
    }

    return {
        data: {
            data,
            next_page_url: page,
        }
    };
};

export const generateTransaction = (id) => {
    const amount = getRandomInt(-1124, 10000);

    return {
        id,
        title: `Transaction ${id}`,
        amount: amount,
        amount_formated: amount < 0 ? (amount + '').replace('-', '-€') : '€' + amount,
        date: `2018-${getRandomInt(10, 12)}-${getRandomInt(10, 31)}`,
        description: `Naam: Amazon Payments Europe SCA \n Omschrijving: JJKN7WSJJ \n 374809327984792387  \n WWW.AMAZON.DE \n WWW.AMAZON.DE \n IBAN: DE968932479832794  \n Kenmerk: 12-11-2018 12:56 9210380912830912803`,
        note: 'Note',
        type: 'pay_terminal',
        currency: 'EUR',
        category_id: 'un',
        category: 'Uncategorized',
        account: amount < 1000 ? 'Checking account' : 'Savings account',
        is_expense: amount < 0
    };
};

export const getCurrencies = () => {
    return [
        {
            value: 'USD',
            label: 'USD',
            sign: '$',
        },
        {
            value: 'EUR',
            label: 'EUR',
            sign: '€',
        },
    ];
}

export const getCategories = () => {
    return [
        {
            label: 'Transacport',
            value: 'tr',
        },
        {
            label: 'Clothing',
            value: 'cl',
        },
        {
            label: 'Hairdresser',
            value: 'hr',
        },
        {
            label: 'Uncategorized',
            value: 'un',
        },
    ];
}

export const generateAuthResponse = (user) => ({
  token: '1a2b3c4d',
  data: {
    email: user.email,
    name: 'Giorgi Chumburidze',
    currency: 'EUR',
  }
});