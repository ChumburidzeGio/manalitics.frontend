import client from '../client';
import { getRandomInt } from '../helpers';

const generateFakeTransactions = (page, amount) => {
    const from = (page - 1) * amount;
    const to = page * amount;
    let data = [];

    for(let i = from; i < to; i++) {
        const amount = getRandomInt(-1124,-10);
        data.push({
            id: i,
            title: `Transaction ${i}`,
            amount: amount,
            date: `2018-${getRandomInt(10,12)}-${getRandomInt(10,31)}`,
            description: 'Description',
            note: 'Note',
            type: 'pay_terminal',
            currency: 'EUR',
            category: 'uncategorized',
            is_expense: amount < 0
        });
    }

    return {
        data: {
            data,
            next_page_url: 'foo',
        }
    };
};

export const load = ({page, query}) => {
    if(process.env.ENV === 'development') {
        return client().get(`/transactions?page=${page}&query=${query}`);
    }

    if(page < 4) {
        return new Promise(resolve => setTimeout(resolve(generateFakeTransactions(page, 10)), 1000));
    }
    
    return new Promise((resolve, reject) => setTimeout(reject, 1000));
};