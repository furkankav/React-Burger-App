import React, { Component } from 'react';

import styles from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Fragment = React.Fragment
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  
  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} clicked={(state) => this.props.clicked(state)} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
} 

export default Modal;