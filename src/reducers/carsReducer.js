export function carsReducer(state = {}, action) {
  switch (action.type) {
    case "GET_CARS_SUCCESS": {
      return action.cars.cars;
    }
    default:
      return state;
  }
}