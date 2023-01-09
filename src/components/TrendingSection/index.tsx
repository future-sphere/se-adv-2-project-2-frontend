import React from 'react';
import { Link } from 'react-router-dom';
import { productPlaceholder } from '../../constants';
import { formatPrice } from '../../helpers';
import { Product } from '../../interfaces';
import a from '../../services';

type Props = {};

const TrendingSection = (props: Props) => {
  const [data, setData] = React.useState<Product[]>([]);

  React.useEffect(() => {
    a.get('/products').then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <section aria-labelledby='trending-heading'>
      <div className='px-4 py-24 mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8 lg:pt-32'>
        <div className='md:flex md:items-center md:justify-between'>
          <h2
            id='favorites-heading'
            className='text-2xl font-bold tracking-tight text-gray-900'
          >
            Trending Products
          </h2>
          <a
            href='#'
            className='hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block'
          >
            Shop the collection
            <span aria-hidden='true'> &rarr;</span>
          </a>
        </div>

        <div className='grid grid-cols-2 mt-6 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8'>
          {data.map((product, index) => (
            <div key={index} className='relative group'>
              <div className='w-full h-56 overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80'>
                <img
                  src={product.thumbnailImage}
                  alt={product.title}
                  className='object-cover object-center w-full h-full'
                />
              </div>
              <h3 className='mt-4 text-sm text-gray-700'>
                <Link to={`/product/${product.slug}`}>
                  <span className='absolute inset-0' />
                  {product.title}
                </Link>
              </h3>
              <p className='mt-1 text-sm font-medium text-gray-900'>
                {formatPrice(product.price)}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-8 text-sm md:hidden'>
          <a
            href='#'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Shop the collection
            <span aria-hidden='true'> &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
