import { getRandomInt, getRandBool, isEnv, client } from '../../helpers';

const generateFakeTransactions = (page, amount) => {
    const from = (page - 1) * amount;
    const to = page * amount;
    let data = [];

    for (let i = from; i < to; i++) {
        data.push(fakeTransaction(i));
    }

    return {
        data: {
            data,
            next_page_url: 'foo',
        }
    };
};

const fakeTransaction = (id) => {
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

export const load = ({ page, query }) => {
    if (isEnv('development')) {
        return client().get(`/transactions?page=${page}&query=${query}`);
    }

    if (page < 4) {
        return new Promise(resolve => setTimeout(resolve(generateFakeTransactions(page, 10)), 1000));
    }

    return new Promise((resolve, reject) => setTimeout(reject, 1000));
};

export const importFromFile = ({ file, bank }) => {
    if (isEnv('development')) {

        const formData = new FormData();

        formData.append('file', file);
        formData.append('bank', bank);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        return client().post('import.fromFile', formData, config);
    }

    if (getRandBool()) {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    return new Promise((resolve, reject) => setTimeout(reject, 1000));
};

export const find = (id) => {
    if (isEnv('development')) {
        return client().get('transaction.details?id=' + id);
    }

    if (getRandBool()) {
        return new Promise(resolve => setTimeout(resolve({
            data: fakeTransaction(id)
        }), 1000));
    }

    return new Promise((resolve, reject) => setTimeout(reject, 1000));
};

export const deleteByIds = (ids) => {
    if (isEnv('development')) {
        return client().post('transaction.deleteByIds', { ids });
    }

    if (getRandBool()) {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    return new Promise((resolve, reject) => setTimeout(reject, 1000));
};

export const create = (data) => {
    if (isEnv('development')) {
        return client().post('transaction.create', data);
    }

    if (getRandBool()) {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    return new Promise((resolve, reject) => setTimeout(reject, 1000));
};

export const update = (data) => {
    if (isEnv('development')) {
        return client().post('transaction.update', data);
    }

    if (getRandBool()) {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    return new Promise((resolve, reject) => setTimeout(reject, 1000));
};

export const getCurrencies = () => {
    if (isEnv('development')) {
        return client().get('transaction.currencies');
    }

    const currencyOptions = [
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

    return new Promise(resolve => setTimeout(resolve(currencyOptions), 1000));
};


export const getCategories = () => {
    if (isEnv('development')) {
        return client().get('transaction.categories');
    }

    const categoryOptions = [
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

    return new Promise(resolve => setTimeout(resolve(categoryOptions), 1000));
};
