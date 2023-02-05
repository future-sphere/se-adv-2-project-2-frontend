import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { productPlaceholder } from '../../constants';
import { Category, SubCategory } from '../../interfaces';
import a from '../../services';

type Props = {};

const CategoryPage = (props: Props) => {
  const [category, setCategory] = React.useState<Category | null>(null);
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  useEffect(() => {
    const fetchData = async () => {
      const response = await a.get('/category/' + slug);
      setCategory(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className='bg-white'>
      <div className='max-w-xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          Shop by {category?.title} Collection
        </h2>
        <p className='mt-4 text-base text-gray-500'>
          Each season, we collaborate with world-class designers to create a
          collection inspired by the natural world.
        </p>

        <div className='mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-8'>
          {category?.subCategory.map((category) => (
            <Link
              key={category.slug}
              to={`/subcategory/${category.slug}`}
              className='block group'
            >
              <div
                aria-hidden='true'
                className='overflow-hidden rounded-lg aspect-w-3 aspect-h-2 group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6'
              >
                <img
                  src={category.thumbnailImageUrl}
                  alt={category.title}
                  className='object-cover object-center w-full h-full'
                />
              </div>
              <h3 className='mt-4 text-base font-semibold text-gray-900'>
                {category.title}
              </h3>
              <p className='mt-2 text-sm text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
