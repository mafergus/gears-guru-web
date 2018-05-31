export function categoriesReducer(state = {}, action) {
  switch (action.type) {
    case "GET_CATEGORIES_SUCCESS": {
      let newState = { ...state };
      Object.entries(action.categories).forEach(entry => {
        newState[entry[0]] = entry[1];
      });
      return newState;
    }
    default:
      return state;
  }
}