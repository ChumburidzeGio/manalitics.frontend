import client from '../client';

export const actionTypes = {
  LOAD_TRANSACTIONS_SUCCESS: 'RRS_LOAD_TRANSACTIONS_SUCCESS',
};

export const initialState = {
  items: [],
  itemsOriginal: [],
  nextPageId: 1,
};

/**
 * To load resources:
 *
 * dispatch(loadResources());
 *
 * @returns {Object}
 */
export function loadTransactions() {
  return function (dispatch, getState) {
    return client().get(`/transactions?page=${getState().transactionReducer.nextPageId}`).then((resources) => {
      dispatch(loadTransactionsSuccess(resources));
    }).catch((error) => {
      throw (error);
    });
  };
}

/**
 * To save loaded transactions:
 *
 * dispatch(loadResourcesSuccess(resources));
 *
 * @param {Object} transactions
 * @returns {Object}
 */
export const loadTransactionsSuccess = transactions => ({
  type: actionTypes.LOAD_TRANSACTIONS_SUCCESS,
  payload: transactions,
});

const groupBy = function (xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default (state = initialState, { type, payload } = {}) => {
  let items,
    itemsOriginal,
    nextPageId;
  switch (type) {
    case actionTypes.LOAD_TRANSACTIONS_SUCCESS:

      itemsOriginal = state.itemsOriginal;

      for (const transaction of payload.data.data) {
        itemsOriginal.push(transaction);
      }

      const grouped = groupBy(itemsOriginal, 'date');

      items = Object.keys(grouped).map((key, index) => ({ day: key, items: grouped[key] }));

      nextPageId = payload.data.next_page_url ? state.nextPageId + 1 : null;

      return { items, itemsOriginal, nextPageId };
    default:
      return state;
  }
};
