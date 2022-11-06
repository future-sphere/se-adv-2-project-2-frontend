import React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className='bg-white'>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
