import { Dialog, Disclosure, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  LanguageIcon,
} from '@heroicons/react/24/solid';
import React, { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { DropdownMenu } from '../../components/DropdownMenu';
import { Empty } from '../../components/Empty';
import { productPlaceholder } from '../../constants';
import { classNames, formatPrice } from '../../helpers';
import { Category, SubCategory } from '../../interfaces';
import a from '../../services';

type Props = {};

const breadcrumbs = [{ id: 1, name: 'Men', href: '#' }];
const filters = [
  {
    id: 'price',
    name: 'Price Range',
    options: [
      {
        value: {
          min: 0,
          max: 100,
        },
        label: 'Under $100',
      },
      {
        value: {
          min: 100,
          max: 150,
        },
        label: '$100 to $150',
      },
      {
        value: {
          min: 150,
          max: 200,
        },
        label: '$150 to $200',
      },
      {
        value: {
          min: 200,
          max: 250,
        },
        label: '$200 to $250',
      },
      {
        value: {
          min: 250,
          max: 300,
        },
        label: '$250 to $300',
      },
      {
        value: {
          min: 350,
          max: 999999,
        },
        label: '$350 and up',
      },
    ],
  },
];

interface Range {
  min: number;
  max: number;
}

export interface Sorting {
  field: string;
  order: 'asc' | 'desc';
}

const SubCategoryPage = (props: Props) => {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  const [subcategory, setSubcategory] = React.useState<SubCategory | null>(
    null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const [filtersMap, setFiltersMap] = React.useState<{
    [key: string]: string;
  }>({});
  const [priceFilters, setPriceFilters] = React.useState<Range[]>([]);
  const [sorting, setSorting] = React.useState<Sorting[]>([]);

  const handleSortingToggle = (field: string, order: 'asc' | 'desc') => {
    const nextSorting = sorting.filter((sort) => sort.field !== field);
    nextSorting.push({ field, order });
    setSorting(nextSorting);
  };

  console.log(sorting);

  const handlePriceFilterChange = (
    filterSection: string,
    filterValue: Range,
    checked: boolean
  ) => {
    if (filterSection === 'price') {
      if (checked) {
        setPriceFilters([...priceFilters, filterValue]);
      } else {
        const nextPriceFilters = priceFilters.filter(
          (filter) =>
            filter.min !== filterValue.min && filter.max !== filterValue.max
        );
        setPriceFilters(nextPriceFilters);
      }
    }
  };

  const clearFilter = (sectionId: string) => {
    if (sectionId === 'price') {
      setPriceFilters([]);
    }
  };

  useEffect(() => {
    a.get('/subcategory/' + slug, {
      params: {
        search: searchInput,
        priceFilters,
        sorting,
      },
    }).then((res) => {
      setSubcategory(res.data);
    });
  }, [slug, searchInput, priceFilters, sorting]);

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
                                  key={optionIdx}
                                  className='flex items-center'
                                >
                                  <input
                                    id={`${section.id}-${optionIdx}-mobile`}
                                    name={`${section.id}[]`}
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
        <div className='flex justify-between pt-24 pb-10 border-b border-gray-200'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
            {subcategory?.title}
          </h1>
          <div className='flex items-center gap-4 w-92'>
            <DropdownMenu
              onSelect={handleSortingToggle}
              value={sorting}
              menuItems={[
                {
                  subMenuItems: [
                    {
                      icon: (
                        <ArrowTrendingUpIcon className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500' />
                      ),
                      label: 'Price: low to high',
                      field: 'price',
                      order: 'asc',
                    },
                    {
                      icon: (
                        <ArrowTrendingDownIcon className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500' />
                      ),
                      label: 'Price: high to low',
                      field: 'price',
                      order: 'desc',
                    },
                    {
                      icon: (
                        <LanguageIcon className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500' />
                      ),
                      label: 'Title: A - Z',
                      field: 'title',
                      order: 'asc',
                    },
                    {
                      icon: (
                        <LanguageIcon className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500' />
                      ),
                      label: 'Title: Z - A',
                      field: 'title',
                      order: 'desc',
                    },
                  ],
                },
              ]}
            />
            <div className='relative rounded-md shadow-sm w-72'>
              <input
                type='text'
                className='block w-full pr-10 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                placeholder='Search for the product title'
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
              <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                <MagnifyingGlassIcon
                  className='w-5 h-5 text-gray-400'
                  aria-hidden='true'
                />
              </div>
            </div>
          </div>
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
                          <div key={optionIdx} className='flex items-center'>
                            <input
                              id={`${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              onChange={(e) => {
                                if (section.id === 'price') {
                                  handlePriceFilterChange(
                                    section.id,
                                    option.value as Range,
                                    e.target.checked
                                  );
                                }
                              }}
                              // checked={filtersMap[section.id].includes(
                              //   option.value
                              // )}
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
                        <button
                          className='block px-4 py-2 mt-4 text-sm text-gray-600 border-2 border-gray-200 rounded-lg hover:border-gray-300'
                          onClick={() => clearFilter(section.id)}
                        >
                          Clear Filters
                        </button>
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
            {!subcategory?.products.length && (
              <div className='flex justify-center w-full py-12'>
                <Empty
                  title='No product found'
                  description='Try entering another search term for better result'
                  icon={
                    <MagnifyingGlassIcon className='w-12 h-12 text-gray-400' />
                  }
                />
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default SubCategoryPage;
