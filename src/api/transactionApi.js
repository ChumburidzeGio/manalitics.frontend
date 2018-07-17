import client from '../client';
import { getRandomInt, log } from '../helpers';

const generateFakeTransactions = (page, amount) => {
    let data = [];
    for(let i = (page * amount); i < amount; i++) {
        const amount = getRandomInt(-1124,-10);
        data.push({
            id: i,
            title: `Transaction ${i}`,
            amount: amount,
            date: `2018-${getRandomInt(10,12)}-${getRandomInt(10,31)} ${getRandomInt(10,23)}:00:00`,
            description: 'Description',
            note: 'Note',
            type: 'pay_terminal',
            currency: 'EUR',
            category: 'uncategorized',
            is_expense: amount < 0
        });
    }

    return {data: {data}};
};

export const load = ({page, query}) => {
    if(process.env.ENV === 'development') {
        log(`transactionApi->load(${page})->clientGet`);
        return client().get(`/transactions?page=${page}&query=${query}`);
    }

    if(page < 4) {
        log(`transactionApi->load(${page})->testResolve`);
        return new Promise(resolve => setTimeout(resolve(generateFakeTransactions(page, 10)), 1000));
    }
    
    log(`transactionApi->load(${page})->testReject`);
    return new Promise((resolve, reject) => setTimeout(reject, 1000));
};