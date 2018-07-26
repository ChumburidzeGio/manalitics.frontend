import * as transactionApi from '../api/transactionApi';

export const actionTypes = {
  LOAD_TRANSACTIONS_SUCCESS: 'RRS_LOAD_TRANSACTIONS_SUCCESS',
  LOAD_TRANSACTIONS_FAIL: 'RRS_LOAD_TRANSACTIONS_FAIL',
  SELECT_TRANSACTION_BY_ID: 'RRS_SELECT_TRANSACTION_BY_ID',
  SELECT_TRANSACTION_ALL: 'RRS_SELECT_TRANSACTION_ALL',
  ACTIVATE_TRANSACTION: 'RRS_ACTIVATE_TRANSACTION',
  DEACTIVATE_TRANSACTION: 'RRS_DEACTIVATE_TRANSACTION',
};

export const initialState = {
  items: [],
  nextPageId: 1,
  query: null,
  selected: [],
  active: null
};

export const selectTransactionById = (id) => ({
  type: actionTypes.SELECT_TRANSACTION_BY_ID,
  payload: { id },
});

export const activateTransaction = (id) => ({
  type: actionTypes.ACTIVATE_TRANSACTION,
  payload: { id },
});

export const deactivateTransaction = () => ({
  type: actionTypes.DEACTIVATE_TRANSACTION,
});

export const selectTransactionsAll = (checked) => ({
  type: actionTypes.SELECT_TRANSACTION_ALL,
  payload: { checked },
});

export const loadTransactionsSuccess = (transactions, query) => ({
  type: actionTypes.LOAD_TRANSACTIONS_SUCCESS,
  payload: {
    items: transactions.data.data,
    hasNext: transactions.data.next_page_url,
  },
  query,
});

export const loadTransactionsFail = () => ({
  type: actionTypes.LOAD_TRANSACTIONS_FAIL,
});

export function loadTransactions(params) {
  return function (dispatch, getState) {
    let state = getState().transactionReducer;
    const query = params === undefined ? state.query : params.query;
    state.nextPageId = query && state.query !== query ? 1 : state.nextPageId;
    
    if(state.nextPageId === null) {
      return dispatch(loadTransactionsFail());
    }

    return transactionApi.load({
      page: state.nextPageId,
      query,
    }).then((resources) => {
      dispatch(loadTransactionsSuccess(resources, query));
    }).catch(() => {
      dispatch(loadTransactionsFail());
    });
  };
}

export default (state = initialState, { type, payload, query } = {}) => {
  let items;
  let selected;
  let nextPageId;
  switch (type) {
    case actionTypes.LOAD_TRANSACTIONS_SUCCESS: {
      
      items = (query && query !== state.query 
        ? payload.items
        : state.items.concat(payload.items)
      );
      
      nextPageId = payload.hasNext ? state.nextPageId + 1 : null;

      return Object.assign({}, state, { items, nextPageId, query  });
    }

    case actionTypes.LOAD_TRANSACTIONS_FAIL: {
      return Object.assign({}, state, {
        nextPageId: null
      });
    }

    case actionTypes.SELECT_TRANSACTION_BY_ID: {
      const selectedIndex = state.selected.indexOf(payload.id);
      let selected = [];

      if (selectedIndex === -1) {
        selected = selected.concat(state.selected, payload.id);
      } else if (selectedIndex === 0) {
        selected = selected.concat(state.selected.slice(1));
      } else if (selectedIndex === state.selected.length - 1) {
        selected = selected.concat(state.selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        selected = selected.concat(
          state.selected.slice(0, selectedIndex),
          state.selected.slice(selectedIndex + 1),
        );
      }

      return Object.assign({}, state, { selected });
    }

    case actionTypes.SELECT_TRANSACTION_ALL: {
      selected = payload.checked ? state.items.map(n => n.id) : [];
      return Object.assign({}, state, { selected });
    }

    case actionTypes.ACTIVATE_TRANSACTION: {
      return Object.assign({}, state, { 
        active: payload.id
       });
    }

    case actionTypes.DEACTIVATE_TRANSACTION: {
      return Object.assign({}, state, { 
        active: null
       });
    }

    default: {
      return state;
    }
  }
};
