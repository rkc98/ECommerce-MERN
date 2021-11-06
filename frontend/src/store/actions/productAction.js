import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
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

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
