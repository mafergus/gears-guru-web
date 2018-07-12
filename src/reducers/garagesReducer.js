export function garagesReducer(state = {}, action) {
  switch (action.type) {
    case "GET_GARAGES_SUCCESS": {
      let newState = { ...state };
      Object.entries(action.garages).forEach(entry => {
        newState[entry[0]] = { ...entry[1], uid: entry[0] };
      });
      return newState;
    }
    default:
      return state;
  }
}