// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formReducer from './Formslice';
// import { loadFormState, saveFormState } from '../utils/localStorage';

const rootReducer = combineReducers({
  form: formReducer,
});

// const persistedState = loadFormState();

export const store = configureStore({
  reducer: rootReducer,
  // preloadedState: persistedState,
  // devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
  // saveFormState(store.getState());
});

export default store;
