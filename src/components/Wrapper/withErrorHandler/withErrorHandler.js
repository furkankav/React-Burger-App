import React, { Component } from 'react';

import Modal from '../../UI/Modal/Modal';

const Fragment = React.Fragment
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props){
      super(props);
      this.state = {
        error: null
      }
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {//res => res shortest possible way to return 
        this.setState({                 //response I care about error We have to return req,res in order to not block axios calls
          error: error
        });
      });
    }
    
    componentWillUnmount(){
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      });
    }

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            clicked={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  }
}

export default withErrorHandler;
