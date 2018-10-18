// ------------------------------------
// Constants
// ------------------------------------
export const MY_ACTION = 'MY_ACTION'

// ------------------------------------
// Actions
// ------------------------------------
export function myAction (value) {
  return {
    type    : MY_ACTION,
    payload : value
  }
}

export const actions = {
  myAction
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MY_ACTION]    : (state, action) => action.payload,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function aboutReducer (state = '', action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
