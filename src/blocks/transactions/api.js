import { getRandBool, isEnv, client } from '../../helpers';
import * as factories from '../../factories';

export const load = ({ page, query }) => {
    if (isEnv('development')) {
        return client().get(`/transactions.all?page=${page}&query=${query}`);
    }

    if (page < 4) {
        const transactions = factories.generateTransactionCollection(page, 10);
        return new Promise(resolve => setTimeout(resolve(transactions, 1000)));
    }

    return new Promise((resolve, reject) => setTimeout(reject, 1000));
}

export const importFromFile = (file, bank) => {
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
}

export const find = (id) => {
    if (isEnv('development')) {
        return client().get('transactions.find?id=' + id);
    }

    if (getRandBool()) {
        return new Promise(resolve => setTimeout(resolve({
            data: factories.generateTransaction(id)
        }), 1000));
    }

    return new Promise((resolve, reject) => setTimeout(reject, 1000));
}

export const deleteByIds = (ids) => {
    if (isEnv('development')) {
        return client().post('transaction.deleteByIds', { ids });
    }

    if (getRandBool()) {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    return new Promise((resolve, reject) => setTimeout(reject, 1000));
}

export const create = (data) => {
    if (isEnv('development')) {
        return client().post('transaction.create', data);
    }

    if (getRandBool()) {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    return new Promise((resolve, reject) => setTimeout(reject, 1000));
}

export const update = (data) => {
    if (isEnv('development')) {
        return client().post('transaction.update', data);
    }

    if (getRandBool()) {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    return new Promise((resolve, reject) => setTimeout(reject, 1000));
}

export const getCurrencies = () => {
    if (isEnv('development')) {
        return client().get('db.currencies').then(({ data }) => {
            const items = [];

            for(const index in data) { 
                items.push({
                    value: index,
                    label: index,
                    sign: data[index]
                });
            }
            
            return items;
        });
    }

    const currencyOptions = factories.getCurrencies();
    return new Promise(resolve => setTimeout(resolve(currencyOptions), 1000));
}


export const getCategories = () => {
    if (isEnv('development')) {
        return client().get('transaction.categories');
    }

    const categoryOptions = factories.getCategories();
    return new Promise(resolve => setTimeout(resolve(categoryOptions), 1000));
}
