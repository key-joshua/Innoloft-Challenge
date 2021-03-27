/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */

import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Pattern from './pattern';
import ViewMap from './viewMap';
import ViewUser from './viewUser';
import Navbar from '../navBar/navBar';
import SideBar from '../sideBar/SideBar';
import Loading from '../loading/loading';
import ViewAttribute from './viewAttribute';
import { viewProduct } from '../../actions';
import { variables, shortData } from '../../helpers';

const successTimeOut = variables.SUCCESS_TIMEOUT;
const errorTimeOut = variables.ERROR_TIMEOUT;
class ViewProducts extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      result: false,
      dataLoaded: false,

      tab: true,
      attrBtnClass: '',
      desBtnClass: 'active-button',

    };
  }

  componentDidMount() {
    const { match, viewCurrentProduct } = this.props;
    viewCurrentProduct(match.params.productId);
    this.setState({ result: true });
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.addEditloadedData === true) {
      this.setState({ data: props.addEditData.data, dataLoaded: props.addEditloadedData });
      toast.success(props.addEditData.message);
      return;
    }

    if (props.loadedData === true) {
      setTimeout(() => {
        this.setState({ result: false, data: props.data.data, dataLoaded: props.loadedData });
      }, successTimeOut);
    }

    if (props.loadedData === false) {
      toast.info(props.data.message);
      setTimeout(() => {
        this.setState({ result: false });
      }, errorTimeOut);
    }
  }

  handleTabButton(key, status) {
    key.preventDefault();

    if (status === 'desc') {
      this.setState({ tab: true, desBtnClass: 'active-button', attrBtnClass: '' });
      return;
    }

    if (status === 'attr') {
      this.setState({ tab: false, desBtnClass: '', attrBtnClass: 'active-button' });
    }
  }

  render() {
    const { result, data, dataLoaded, tab, desBtnClass, attrBtnClass } = this.state;

    return (

      <div>

        <Helmet>
          <style>{'body { background-color: rgb(231, 230, 230); }'}</style>
        </Helmet>

        <ToastContainer />

        <Navbar MainProps={this.props} />

        {result === true ? <Loading MainProps={this.props} /> : null }

        {dataLoaded === true && data ? <SideBar MainProps={{ props: this.props, data }} /> : null }

        <div className="product-container">

          <h1>Product Details</h1>

          <Pattern />

          {dataLoaded === true && data
            ? (
              <div className="product-container">

                <div className="view-container">

                  <section className="section-one">

                    <div className="product-image-container">

                      <div className="title">{data.name}</div>

                      <img src={data.picture} alt="product-pic" />

                    </div>

                    <div className="product-info-container">

                      <div>Type: <span>{data.type.name}</span> </div>
                      <div>categories: {data.categories.length > 0 ? data.categories.map((element) => <span key={element.id}>{element.name}, </span>) : null } </div>

                    </div>

                    <div className="product-separator" />

                    <div className="product-tab-container">

                      <div className="tab-button">

                        <button type="button" className={desBtnClass} onClick={(key) => { this.handleTabButton(key, 'desc'); }}> Discription </button>
                        <button type="button" className={attrBtnClass} onClick={(key) => { this.handleTabButton(key, 'attr'); }}> attributes </button>

                      </div>

                      { tab === true
                        ? <div className="description-container"> {shortData(data.description, 800)} </div>

                        : <ViewAttribute MainProps={{ data, props: this.props }} /> }

                    </div>

                  </section>

                  <section className="section-two">

                    <ViewUser MainProps={data} />

                    <ViewMap MainProps={data.company} />

                  </section>

                </div>

              </div>
            )
            : null }

        </div>

      </div>

    );
  }
}

ViewProducts.defaultProps = {
  loadedData: null,
  data: {},

  addEditloadedData: null,
  addEditData: {},

  match: {},
  viewCurrentProduct: PropTypes.func,
};

ViewProducts.propTypes = {
  loadedData: PropTypes.bool,
  data: PropTypes.shape(),

  addEditloadedData: PropTypes.bool,
  addEditData: PropTypes.shape(),

  match: PropTypes.shape(),
  viewCurrentProduct: PropTypes.func,
};

const mapStateToProps = ({ viewProductsInitialState, addEditProductsInitialState }) => (
  {
    loadedData: viewProductsInitialState.loading,
    data: viewProductsInitialState.data,

    addEditloadedData: addEditProductsInitialState.loading,
    addEditData: addEditProductsInitialState.data,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    viewCurrentProduct: (productId) => {
      dispatch(viewProduct(productId));
    },

  });

export default connect(mapStateToProps, mapDispatchToProps)(ViewProducts);
