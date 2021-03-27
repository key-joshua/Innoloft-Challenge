import addEditProductsInitialState from '../../store/initialState';
import addEditProductsReducer from './addEditProductsReducer';

export default (state = addEditProductsInitialState, action) => {
  const addEditProducts = addEditProductsReducer(state, action);
  return (addEditProducts || state);
};
