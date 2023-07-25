// store/configureStore.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import categoryReducer from '../reducers/categoryReducer';
import gameReducer from '../reducers/gameReducer';
// Import other reducers here if you have more than one

// Combine the reducers using combineReducers
const rootReducer = combineReducers({
   categoryReducer,
   gameReducer,
  // Add other reducers here if you have more than one
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
