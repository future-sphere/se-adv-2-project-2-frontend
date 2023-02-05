import { Dialog, Disclosure, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import React, { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productPlaceholder } from '../../constants';
import { classNames, formatPrice } from '../../helpers';
import { Category, SubCategory } from '../../interfaces';
import a from '../../services';

type Props = {};

const breadcrumbs = [{ id: 1, name: 'Men', href: '#' }];
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals' },
      { value: 'tees', label: 'Tees' },
      { value: 'crewnecks', label: 'Crewnecks' },
      { value: 'sweatshirts', label: 'Sweatshirts' },
      { value: 'pants-shorts', label: 'Pants & Shorts' },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: '2xl', label: '2XL' },
    ],
  },
];
const products = [
  {
    id: 1,
    name: 'Basic Tee 8-Pack',
    href: '#',
    price: '$256',
    description:
      'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    options: '8 colors',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt:
      'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description:
      'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  // More products...
];

const SubCategoryPage = (props: Props) => {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  const [subcategory, setSubcategory] = React.useState<SubCategory | null>(
    null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  useEffect(() => {
    a.get('/subcategory/' + slug).then((res) => {
      setSubcategory(res.data);
    });
  }, [slug]);

  console.log(subcategory, 'subcategory');
  return (
    <>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-40 lg:hidden'
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 z-40 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <Dialog.Panel className='relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl'>
                <div className='flex items-center justify-between px-4'>
                  <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                  <button
                    type='button'
                    className='flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 hover:text-gray-500'
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='w-6 h-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Filters */}
                <form className='mt-4'>
                  {filters.map((section) => (
                    <Disclosure
                      as='div'
                      key={section.name}
                      className='pt-4 pb-4 border-t border-gray-200'
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className='w-full px-2'>
                            <Disclosure.Button className='flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500'>
                              <span className='text-sm font-medium text-gray-900'>
                                {section.name}
                              </span>
                              <span className='flex items-center ml-6 h-7'>
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? '-rotate-180' : 'rotate-0',
                                    'h-5 w-5 transform'
                                  )}
                                  aria-hidden='true'
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className='px-4 pt-4 pb-2'>
                            <div className='space-y-6'>
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className='flex items-center'
                                >
                                  <input
                                    id={`${section.id}-${optionIdx}-mobile`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type='checkbox'
                                    className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                                  />
                                  <label
                                    htmlFor={`${section.id}-${optionIdx}-mobile`}
                                    className='ml-3 text-sm text-gray-500'
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className='border-b border-gray-200'>
        <nav
          aria-label='Breadcrumb'
          className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'
        >
          <ol role='list' className='flex items-center py-4 space-x-4'>
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className='flex items-center'>
                  <a
                    href={breadcrumb.href}
                    className='mr-4 text-sm font-medium text-gray-900'
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    viewBox='0 0 6 20'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    className='w-auto h-5 text-gray-300'
                  >
                    <path
                      d='M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
              </li>
            ))}
            <li className='text-sm'>
              <a
                href='#'
                aria-current='page'
                className='font-medium text-gray-500 hover:text-gray-600'
              >
                New Arrivals
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <main className='max-w-2xl px-4 mx-auto lg:max-w-7xl lg:px-8'>
        <div className='pt-24 pb-10 border-b border-gray-200'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
            {subcategory?.title}
          </h1>
        </div>

        <div className='pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4'>
          <aside>
            <h2 className='sr-only'>Filters</h2>

            <button
              type='button'
              className='inline-flex items-center lg:hidden'
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className='text-sm font-medium text-gray-700'>Filters</span>
              <PlusIcon
                className='flex-shrink-0 w-5 h-5 ml-1 text-gray-400'
                aria-hidden='true'
              />
            </button>

            <div className='hidden lg:block'>
              <form className='space-y-10 divide-y divide-gray-200'>
                {filters.map((section, sectionIdx) => (
                  <div
                    key={section.name}
                    className={sectionIdx === 0 ? undefined : 'pt-10'}
                  >
                    <fieldset>
                      <legend className='block text-sm font-medium text-gray-900'>
                        {section.name}
                      </legend>
                      <div className='pt-6 space-y-3'>
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className='flex items-center'>
                            <input
                              id={`${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type='checkbox'
                              className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                            />
                            <label
                              htmlFor={`${section.id}-${optionIdx}`}
                              className='ml-3 text-sm text-gray-600'
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                ))}
              </form>
            </div>
          </aside>

          <section
            aria-labelledby='product-heading'
            className='mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3'
          >
            <h2 id='product-heading' className='sr-only'>
              Products
            </h2>

            <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
              {subcategory?.products.map((product) => (
                <div
                  key={product.id}
                  className='relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg group'
                >
                  <div className='p-4 bg-white aspect-w-3 aspect-h-4 group-hover:opacity-75 sm:aspect-none sm:h-96'>
                    <img
                      src={product.thumbnailImage}
                      alt={product.title}
                      className='object-cover object-center w-full h-full sm:h-full sm:w-full'
                    />
                  </div>
                  <div className='flex flex-col flex-1 p-4 space-y-2'>
                    <h3 className='text-sm font-medium text-gray-900'>
                      <a href={`/product/${product.slug}`}>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {product.title}
                      </a>
                    </h3>
                    <p className='text-sm text-gray-500'>
                      {'This is a good product that you should buy'}
                    </p>
                    <div className='flex flex-col justify-end flex-1'>
                      <p className='text-sm italic text-gray-500'>
                        {product.quantity} in stock
                      </p>
                      <p className='text-base font-medium text-gray-900'>
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default SubCategoryPage;
