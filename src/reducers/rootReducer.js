import { combineReducers } from "redux";
import { responsiveStateReducer } from 'redux-responsive';
import { garagesReducer } from 'reducers/garagesReducer';
import { categoriesReducer } from 'reducers/categoriesReducer';
import { listsReducer } from 'reducers/listsReducer'; 
import { reviewsReducer } from 'reducers/reviewsReducer';
import { authedUserReducer } from 'reducers/authedUserReducer'; 
import { carsReducer } from 'reducers/carsReducer';

const appReducer = combineReducers({
  authedUser: authedUserReducer,
  browser: responsiveStateReducer,
  cars: carsReducer,
  categories: categoriesReducer,
  reviews: reviewsReducer,
  garages: garagesReducer,
  lists: listsReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;