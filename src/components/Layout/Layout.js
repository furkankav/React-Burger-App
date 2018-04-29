
import React, { Component } from 'react';

import styles from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
const Fragment = React.Fragment

class Layout extends Component {
  
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerOpenedHandler = () => {
    this.setState({
      showSideDrawer: true
    })
  }

  render() {
    return (
      <Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerOpenedHandler} />
        <SideDrawer isOpen={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

export default Layout;

