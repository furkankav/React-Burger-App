
import React from 'react'
import styles from './Layout.css'

const Fragment = React.Fragment

const layout = (props) => (
  <Fragment>
    <div> Toolbar, SideDrawer, Backdrop</div>
    <main className={styles.Content}>
      {props.children}
    </main>
  </Fragment>
);

export default layout;

