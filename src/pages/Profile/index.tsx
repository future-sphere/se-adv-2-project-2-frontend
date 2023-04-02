import { Menu, Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { classNames, formatPrice } from '../../helpers';
import { Order } from '../../interfaces';
import a from '../../services';

type Props = {};

const orders = [
  {
    number: 'WU88191111',
    href: '#',
    invoiceHref: '#',
    createdDate: 'Jul 6, 2021',
    createdDatetime: '2021-07-06',
    deliveredDate: 'July 12, 2021',
    deliveredDatetime: '2021-07-12',
    total: '$160.00',
    products: [
      {
        id: 1,
        name: 'Micro Backpack',
        description:
          'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
        href: '#',
        price: '$70.00',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
        imageAlt:
          'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
      },
      // More products...
    ],
  },
  // More orders...
];

const ProfilePage = (props: Props) => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [userId, setUserId] = React.useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await a.get('/orders/student/' + userId);
      if (response.data) {
        setOrders(response.data);
      }
    };
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigate('/signin');
      }

      try {
        const response = await a.get('/auth/check', {
          params: {
            token,
          },
        });

        if (!response.data.id) {
          return navigate('/signin');
        }
        setUserId(response.data.id);
      } catch (error: any) {
        if (error.response.status === 401) {
          return navigate('/signin');
        }
      }
    };

    fetchData();
    checkAuth();
  }, []);

  return (
    <main className='py-24'>
      <div className='mx-auto max-w-7xl sm:px-2 lg:px-8'>
        <div className='max-w-2xl px-4 mx-auto lg:max-w-4xl lg:px-0'>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
            Order history
          </h1>
          <p className='mt-2 text-sm text-gray-500'>
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </div>
      </div>

      <section aria-labelledby='recent-heading' className='mt-16'>
        <h2 id='recent-heading' className='sr-only'>
          Recent orders
        </h2>
        <div className='mx-auto max-w-7xl sm:px-2 lg:px-8'>
          <div className='max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0'>
            {orders.length ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className='bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border'
                >
                  <h3 className='sr-only'>
                    Order placed on{' '}
                    <time>{dayjs(order.createdAt).format('MMMM D, YYYY')}</time>
                  </h3>

                  <div className='flex items-center p-4 border-b border-gray-200 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6'>
                    <dl className='grid flex-1 grid-cols-2 text-sm gap-x-6 sm:col-span-3 sm:grid-cols-3 lg:col-span-2'>
                      <div>
                        <dt className='font-medium text-gray-900'>
                          Order number
                        </dt>
                        <dd className='mt-1 text-gray-500'>{order.id}</dd>
                      </div>
                      <div className='hidden sm:block'>
                        <dt className='font-medium text-gray-900'>
                          Date placed
                        </dt>
                        <dd className='mt-1 text-gray-500'>
                          <time>
                            <time>
                              {dayjs(order.createdAt).format('MMMM D, YYYY')}
                            </time>
                          </time>
                        </dd>
                      </div>
                      <div>
                        <dt className='font-medium text-gray-900'>
                          Total amount
                        </dt>
                        <dd className='mt-1 font-medium text-gray-900'>
                          {formatPrice(
                            order.products.reduce((acc, product) => {
                              return acc + product.price;
                            }, 0)
                          )}
                        </dd>
                      </div>
                    </dl>

                    <Menu
                      as='div'
                      className='relative flex justify-end lg:hidden'
                    >
                      <div className='flex items-center'>
                        <Menu.Button className='flex items-center p-2 -m-2 text-gray-400 hover:text-gray-500'>
                          <span className='sr-only'>
                            Options for order {order.id}
                          </span>
                          <EllipsisVerticalIcon
                            className='w-6 h-6'
                            aria-hidden='true'
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute right-0 z-10 w-40 mt-2 origin-bottom-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <div className='py-1'>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href={order.id.toString()}
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  View
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4'>
                      <a
                        href='#'
                        className='flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      >
                        <span>View Order</span>
                      </a>
                    </div>
                  </div>

                  {/* Products */}
                  <h4 className='sr-only'>Items</h4>
                  <ul role='list' className='divide-y divide-gray-200'>
                    {order.products.map((product) => (
                      <li key={product.id} className='p-4 sm:p-6'>
                        <div className='flex items-center sm:items-start'>
                          <div className='flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-200 rounded-lg sm:h-40 sm:w-40'>
                            <img
                              src={product.thumbnailImage}
                              alt={product.title}
                              className='object-cover object-center w-full h-full'
                            />
                          </div>
                          <div className='flex-1 ml-6 text-sm'>
                            <div className='font-medium text-gray-900 sm:flex sm:justify-between'>
                              <h5>{product.title}</h5>
                              <p className='mt-2 sm:mt-0'>
                                {formatPrice(product.price)}
                              </p>
                            </div>
                            <p className='hidden text-gray-500 sm:mt-2 sm:block'>
                              {product.description}
                            </p>
                          </div>
                        </div>

                        <div className='mt-6 sm:flex sm:justify-between'>
                          <div className='flex items-center'>
                            <CheckCircleIcon
                              className='w-5 h-5 text-green-500'
                              aria-hidden='true'
                            />
                            <p className='ml-2 text-sm font-medium text-gray-500'>
                              Delivered on{' '}
                              <time>
                                {dayjs(order.createdAt)
                                  .add(1, 'day')
                                  .format('MMMM D, YYYY')}
                              </time>
                            </p>
                          </div>

                          <div className='flex items-center pt-4 mt-6 space-x-4 text-sm font-medium border-t border-gray-200 divide-x divide-gray-200 sm:mt-0 sm:ml-4 sm:border-none sm:pt-0'>
                            <div className='flex justify-center flex-1'>
                              <Link
                                to={`/product/${product.id}`}
                                className='text-indigo-600 whitespace-nowrap hover:text-indigo-500'
                              >
                                View product
                              </Link>
                            </div>
                            <div className='flex justify-center flex-1 pl-4'>
                              <a
                                href='#'
                                className='text-indigo-600 whitespace-nowrap hover:text-indigo-500'
                              >
                                Buy again
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className='text-center'>
                <p className='text-sm text-gray-500'>
                  You have no orders placed yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
