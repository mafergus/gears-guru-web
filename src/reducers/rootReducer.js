import { combineReducers } from "redux";
import { responsiveStateReducer } from 'redux-responsive';
import { routerReducer } from 'react-router-redux';
import { garagesReducer } from 'reducers/garagesReducer';
import { categoriesReducer } from 'reducers/categoriesReducer';
import { listsReducer } from 'reducers/listsReducer'; 
import { feedReducer } from 'reducers/feedReducer';
import { authedUserReducer } from 'reducers/authedUserReducer'; 

const appReducer = combineReducers({
  authedUser: authedUserReducer,
  browser: responsiveStateReducer,
  categories: categoriesReducer,
  feeds: feedReducer,
  garages: garagesReducer,
  lists: listsReducer,
  router: routerReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;