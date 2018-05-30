import { combineReducers } from "redux";
import { responsiveStateReducer } from 'redux-responsive';
import { routerReducer } from 'react-router-redux';
import { garagesReducer } from 'reducers/garagesReducer';

const appReducer = combineReducers({
  browser: responsiveStateReducer,
  garages: garagesReducer,
  router: routerReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;