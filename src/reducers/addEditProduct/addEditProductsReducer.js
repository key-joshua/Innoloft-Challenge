import { addEditProductsTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case addEditProductsTypes.ADD_EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: true,
        data: payload,
      };
    case addEditProductsTypes.ADD_EDIT_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    default:
      return null;
  }
};
