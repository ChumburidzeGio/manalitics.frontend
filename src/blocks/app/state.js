export const actionTypes = {
  SHOW_SNACK: 'RRS_SHOW_SNACK',
  HIDE_SNACK: 'RRS_HIDE_SNACK',
};

let initialState = {
  queue: [],
  lastItemId: 0,
};

export const showSnack = (label, duration, id) => ({
  type: actionTypes.SHOW_SNACK,
  payload: { label, duration, id },
});

export const hideSnack = id => ({
  type: actionTypes.HIDE_SNACK,
  payload: { id },
});

export const snackbarReducer = (state = initialState, { type, payload } = {}) => {
  let queue, lastItemId;
  switch (type) {
    case actionTypes.SHOW_SNACK:
      lastItemId = payload.id || (state.lastItemId + 1);

      queue = state.queue.slice();

      queue.push({
        label: payload.label,
        duration: payload.duration,
        id: lastItemId,
      });
      
      return { queue, lastItemId };
    case actionTypes.HIDE_SNACK:
      queue = state.queue.filter(obj => obj.id !== payload.id);
      return Object.assign({}, state, { queue });
    default:
      return state;
  }
};

