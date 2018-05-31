export function listsReducer(state = {}, action) {
  switch (action.type) {
    case "GET_LISTS_SUCCESS": {
      let newState = { ...state };
      Object.entries(action.lists).forEach(entry => {
        newState[entry[0]] = entry[1];
      });
      return newState;
    }
    default:
      return state;
  }
}