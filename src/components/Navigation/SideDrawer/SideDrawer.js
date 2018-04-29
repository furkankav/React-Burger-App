import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const Fragment = React.Fragment
const sideDrawer = (props) => {
  let attachedStyles = [styles.SideDrawer, styles.Close]
  if(props.isOpen){
    attachedStyles = [styles.SideDrawer, styles.Open]
  }
  return (
    <Fragment>
      <Backdrop show={props.isOpen} clicked={props.closed} />
      <div className={attachedStyles.join(' ')}>
        <div style={{ height: '15%', marginBottom: '32px' }}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  )
}

export default sideDrawer