// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formReducer from './Formslice';


const rootReducer = combineReducers({
  form: formReducer,
});



export const store = configureStore({
  reducer: rootReducer,
});


export default store;
