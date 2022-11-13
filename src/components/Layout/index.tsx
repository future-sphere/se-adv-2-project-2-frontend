import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';

type Props = {
  children?: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className='bg-white'>
      <Navbar />
      <Outlet />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
