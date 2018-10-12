
export function reviewsReducer(state = {}, action) {
  switch (action.type) {
    case "GET_REVIEWS_SUCCESS": {
      let newState = state;
      Object.entries(action.reviews).forEach(entry => {
        newState[entry[0]] = entry[1];
      });
      return newState;
    }
    default:
      return state;
  }
}