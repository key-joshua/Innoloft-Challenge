import axios from 'axios';
import { apiList } from '../../helpers';
import { addEditProductsTypes } from '../../actionTypes';

export const addEditProduct = (productId) => (dispatch) => axios.put(`${apiList.ADD_EDIT_PRODUCT_DETAILS_API}/${productId}`)
  .then((response) => {
    dispatch({
      type: addEditProductsTypes.ADD_EDIT_PRODUCT_SUCCESS,
      payload: response.data
    });
  })
  .catch((error) => {
    dispatch({
      type: addEditProductsTypes.ADD_EDIT_PRODUCT_FAILURE,
      payload: error.response.data
    });
  });
