// ------------------------------------
// Constants
// ------------------------------------
export const INIT_DATA = 'INIT_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export function initData (value = {}) {
  return {
    type    : INIT_DATA,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const actions = { initData }

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_DATA]    : (state, action) => Object.assign({}, state, action.payload),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function homeViewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
