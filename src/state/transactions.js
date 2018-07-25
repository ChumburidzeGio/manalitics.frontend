import * as transactionApi from '../api/transactionApi';
import { groupBy } from '../helpers';

export const actionTypes = {
  LOAD_TRANSACTIONS_SUCCESS: 'RRS_LOAD_TRANSACTIONS_SUCCESS',
  LOAD_TRANSACTIONS_FAIL: 'RRS_LOAD_TRANSACTIONS_FAIL',
};

export const initialState = {
  items: [],
  itemsOriginal: [],
  nextPageId: 1,
};

export const loadTransactionsSuccess = transactions => ({
  type: actionTypes.LOAD_TRANSACTIONS_SUCCESS,
  payload: transactions,
});

export const loadTransactionsFail = () => ({
  type: actionTypes.LOAD_TRANSACTIONS_FAIL,
});

export function loadTransactions() {
  return function (dispatch, getState) {
    const { nextPageId } = getState().transactionReducer;

    if(nextPageId === null) {
      return dispatch(loadTransactionsFail());
    }

    return transactionApi.load({
      page: nextPageId,
    }).then((resources) => {
      dispatch(loadTransactionsSuccess(resources));
    }).catch((error) => {
      dispatch(loadTransactionsFail());
    });
  };
}

export default (state = initialState, { type, payload } = {}) => {
  let items;
  let itemsOriginal;
  let nextPageId;
  switch (type) {
    case actionTypes.LOAD_TRANSACTIONS_SUCCESS: {
      itemsOriginal = state.itemsOriginal;

      items = itemsOriginal = state.itemsOriginal.concat(payload.data.data);
      
      // const grouped = groupBy(itemsOriginal, 'date');

      // items = Object.keys(grouped).map((key, index) => ({ day: key, items: grouped[key] }));

      nextPageId = payload.data.next_page_url ? state.nextPageId + 1 : null;

      return { items, itemsOriginal, nextPageId };
    }

    case actionTypes.LOAD_TRANSACTIONS_FAIL: {
      return Object.assign({}, state, {
        nextPageId: null
      });
    }

    default: {
      return state;
    }
  }
};
