import React from 'react';
import NavBar from './NavBar';
import '../styles.css';

const Layout = ({
  children
}) => (
  <div>
    <NavBar />
    <div style={{height: 100}}></div>
    <div className='container-fluid'>{children}</div>
  </div>
);

export default Layout;
