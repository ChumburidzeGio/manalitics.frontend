import client from '../client';

export const actionTypes = {
    LOAD_TRANSACTIONS_SUCCESS: 'RRS_LOAD_TRANSACTIONS_SUCCESS',
};

export const initialState = {
    items: [],
    nextPageId: 1
};

/**
 * To load resources:
 *
 * dispatch(loadResources());
 *
 * @returns {Object}
 */
export function loadTransactions() {
    return function(dispatch, getState) {
        return client.get('/transactions?page='+getState().transactionReducer.nextPageId).then(resources => {
            dispatch(loadTransactionsSuccess(resources))
        }).catch(error => {
            throw(error)
        })
    }
}

/**
 * To save loaded transactions:
 *
 * dispatch(loadResourcesSuccess(resources));
 *
 * @param {Object} transactions
 * @returns {Object}
 */
export const loadTransactionsSuccess = (transactions) => {
    return {
        type: actionTypes.LOAD_TRANSACTIONS_SUCCESS,
        payload: transactions,
    }
}

export default (state = initialState, { type, payload } = {}) => {
    let items;
    switch (type) {
        case actionTypes.LOAD_TRANSACTIONS_SUCCESS:

            items = state.items

            for (let transaction of payload.data.data) {
                items.push(transaction)
            }
            
            let nextPageId = payload.data.next_page_url ? state.nextPageId + 1 : null;

            return { items, nextPageId };
        default:
            return state;
    }
}