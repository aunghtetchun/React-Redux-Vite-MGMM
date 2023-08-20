import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import gameReducer from '../reducers/gameReducer';
import softwareReducer from '../reducers/softwareReducer';
import adultReducer from '../reducers/adultReducer';
// Import other reducers here if you have more than one

// Combine the reducers using combineReducers
const rootReducer = combineReducers({
   gameReducer,
   softwareReducer,
   adultReducer,
  // Add other reducers here if you have more than one
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
