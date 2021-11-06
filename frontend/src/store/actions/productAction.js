import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";

//get all products
export const getProducts = () => async (dispatch) => {
  console.log("here");
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    console.log("here");
    const { data } = await axios.get("/api/v1/products");
    console.log(data);

    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: ALL_PRODUCT_FAIL, payload: err });
  }
};

//get Product Details
export const getProductDetails = (id) => async (dispatch) => {
  console.log("here");
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    console.log("here");
    const { data } = await axios.get(`/api/v1/product/${id}`);
    console.log(data);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (err) {
    console.log(err);
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
