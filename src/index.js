import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import { fetchProducts } from "./redux/actions/productActions";
import rootReducer from "./redux/reducers/rootReducer";
import products from "./data/products.json";
import productData from "./products"
import App from "./App";
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";
import ApiComponent from "./products"
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios"

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(thunk, save()))
);

// fetch products products api
const fetchData = async()=> {
  const response = await axios(
      'https://jsonplaceholder.typicode.com/posts',
  );
 console.log(('data',response.data));          
}
fetchData()
// gets from the data api request and dispatch
store.dispatch(fetchProducts(products));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
