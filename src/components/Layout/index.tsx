import React from 'react';
import { Outlet } from 'react-router-dom';
import { Category } from '../../interfaces';
import a from '../../services';
import Footer from '../Footer';
import Navbar from '../Navbar';

type Props = {
  children?: React.ReactNode;
};

const Layout = (props: Props) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await a.get('/category');
      setCategories(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className='bg-white'>
      <Navbar categories={categories} />
      <Outlet context={{ categories }} />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
