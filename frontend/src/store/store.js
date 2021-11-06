import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducers/productReducer";

const reducers = combineReducers({
  products: productReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
