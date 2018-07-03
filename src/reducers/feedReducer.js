
export function feedReducer(state = {}, action) {
  switch (action.type) {
    case "GET_FEEDS_SUCCESS": {
      let newState = state;
      Object.entries(action.feeds).forEach(entry => {
        newState[entry[0]] = entry[1];
      });
      return newState;
    }
    default:
      return state;
  }
}