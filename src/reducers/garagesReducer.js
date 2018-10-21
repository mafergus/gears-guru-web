export function garagesReducer(state = {}, action) {
  switch (action.type) {
    case "GET_GARAGES_SUCCESS": {
      let newState = { ...state };
      Object.entries(action.garages).forEach(entry => {
        const [ uid, obj ] = entry;
        const newObj = {
          ...state[uid],
          ...obj,
          uid,
        };
        newState[uid] = newObj;
      });
      return newState;
    }
    case "GET_GARAGE_SUCCESS": {
      let newState = { ...state };
      newState[action.garage.key] = action.garage;
      return newState;
    }
    default:
      return state;
  }
}