/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Loading from '../loading/loading';
import { variables } from '../../helpers';
import { viewTrls, addEditProduct } from '../../actions';

const successTimeOut = variables.SUCCESS_TIMEOUT;
const errorTimeOut = variables.ERROR_TIMEOUT;
class ViewAttribute extends Component {
  constructor() {
    super();
    this.state = {
      trl: '',
      category: '',
      businessModel: '',

      data: [],
      dataLoaded: false,
      buttonStatus: false,
    };
  }

  componentDidMount() {
    const { viewCurrentTrls } = this.props;
    viewCurrentTrls();
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.MainProps.props.addEditloadedData === true) {
      this.setState({ result: false, buttonStatus: true, trl: '', category: '', businessModel: '' });
    }

    if (props.MainProps.props.addEditloadedData === false) {
      toast.info(props.MainProps.props.addEditData.message);
      setTimeout(() => {
        this.setState({ result: false });
      }, errorTimeOut);
    }

    if (props.loadedData === true) {
      setTimeout(() => {
        this.setState({ data: [...props.data.data], dataLoaded: props.loadedData });
      }, successTimeOut);
      return;
    }

    if (props.loadedData === false) {
      const { data } = this.state;
      setTimeout(() => {
        this.setState({ data: [...data] });
      }, successTimeOut);
    }
  }

  handleChange(key) {
    key.preventDefault();
    this.setState({ [key.target.id]: key.target.value });
  }

  handleSubmit(key) {
    key.preventDefault();

    const { addEditCurrentProduct, MainProps } = this.props;
    const { trl, category, businessModel } = this.state;
    if (trl.length < 1 || category.length < 1 || businessModel.length < 1) {
      toast.error('All form fields are required');
      return;
    }

    this.setState({ result: true, buttonStatus: true });
    addEditCurrentProduct(MainProps.data.id);
  }

  render() {
    const { MainProps } = this.props;
    const { result, buttonStatus, dataLoaded, data, category, businessModel, trl } = this.state;
    return (
      <div>

        <ToastContainer />
        <form className="attribute-container">
            <div className="attribute-form-container">
                <input type="text" id="category" value={category} placeholder="Category" onChange={(id) => this.handleChange(id)} />
                <input type="text" id="businessModel" value={businessModel} placeholder="Business Model" onChange={(id) => this.handleChange(id)} />
                <select id="trl" value={trl} onChange={(id) => this.handleChange(id)}>
                  <option value=""> Select </option>
                  {dataLoaded === true && data.length > 0 ? data.map((element) => (<option value={element.name} key={element.id}> {element.name} </option>)) : null}
                </select>

                <span> {result === true ? <Loading MainProps={MainProps.props} Case /> : null } </span>
                <button disabled={buttonStatus} type="button" onClick={(key) => { this.handleSubmit(key); }}> PROCCED </button>
            </div>

        </form>

      </div>

    );
  }
}

ViewAttribute.defaultProps = {
  loadedData: null,
  data: {},

  addEditloadedData: null,
  addEditData: {},

  MainProps: {},
  viewCurrentTrls: PropTypes.func,
  addEditCurrentProduct: PropTypes.func,
};

ViewAttribute.propTypes = {
  loadedData: PropTypes.bool,
  data: PropTypes.shape(),

  addEditloadedData: PropTypes.bool,
  addEditData: PropTypes.shape(),

  MainProps: PropTypes.shape(),
  viewCurrentTrls: PropTypes.func,
  addEditCurrentProduct: PropTypes.func,
};

const mapStateToProps = ({ viewTrlsInitialState }) => (
  {
    loadedData: viewTrlsInitialState.loading,
    data: viewTrlsInitialState.data,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    viewCurrentTrls: () => {
      dispatch(viewTrls());
    },
    addEditCurrentProduct: (productId) => {
      dispatch(addEditProduct(productId));
    },

  });

export default connect(mapStateToProps, mapDispatchToProps)(ViewAttribute);
