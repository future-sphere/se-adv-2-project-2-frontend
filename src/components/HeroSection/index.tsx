import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../interfaces';

type Props = {
  categories: Category[];
};

const HeroSection = ({ categories }: Props) => {
  return (
    <div className='relative'>
      {/* Background image and overlap */}
      <div
        aria-hidden='true'
        className='absolute inset-0 hidden sm:flex sm:flex-col'
      >
        <div className='relative flex-1 w-full bg-gray-800'>
          <div className='absolute inset-0 overflow-hidden'>
            <img
              src='https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg'
              alt=''
              className='object-cover object-center w-full h-full'
            />
          </div>
          <div className='absolute inset-0 bg-gray-900 opacity-50' />
        </div>
        <div className='w-full h-32 bg-white md:h-40 lg:h-48' />
      </div>

      <div className='relative max-w-3xl px-4 mx-auto text-center pb-96 sm:px-6 sm:pb-0 lg:px-8'>
        {/* Background image and overlap */}
        <div
          aria-hidden='true'
          className='absolute inset-0 flex flex-col sm:hidden'
        >
          <div className='relative flex-1 w-full bg-gray-800'>
            <div className='absolute inset-0 overflow-hidden'>
              <img
                src='https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg'
                alt=''
                className='object-cover object-center w-full h-full'
              />
            </div>
            <div className='absolute inset-0 bg-gray-900 opacity-50' />
          </div>
          <div className='w-full h-48 bg-white' />
        </div>
        <div className='relative py-32'>
          <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>
            Mid-Season Sale
          </h1>
          <div className='mt-4 sm:mt-6'>
            <a
              href='#'
              className='inline-block px-8 py-3 font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700'
            >
              Shop Collection
            </a>
          </div>
        </div>
      </div>

      <section
        aria-labelledby='collection-heading'
        className='relative -mt-96 sm:mt-0'
      >
        <h2 id='collection-heading' className='sr-only'>
          Collections
        </h2>
        <div className='mx-auto grid max-w-md grid-cols-1 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-6 sm:px-6 lg:gap-8 lg:px-8 h-[480px]'>
          {categories.map((category) => (
            <div
              key={category.title}
              className='relative bg-white rounded-lg shadow-xl group h-96 sm:aspect-w-4 sm:aspect-h-5 sm:h-auto'
            >
              <div>
                <div
                  aria-hidden='true'
                  className='absolute inset-0 overflow-hidden rounded-lg'
                >
                  <div className='absolute inset-0 overflow-hidden group-hover:opacity-75'>
                    <img
                      src={category.thumbnailImageUrl}
                      alt={category.title}
                      className='object-cover object-center w-full h-full'
                    />
                  </div>
                  <div className='absolute inset-0 opacity-50 bg-gradient-to-b from-transparent to-black' />
                </div>
                <div className='absolute inset-0 flex items-end p-6 rounded-lg'>
                  <div>
                    <p aria-hidden='true' className='text-sm text-white'>
                      Shop the collection
                    </p>
                    <h3 className='mt-1 font-semibold text-white'>
                      <Link to={`/category/${category.slug}`}>
                        <span className='absolute inset-0' />
                        {category.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
