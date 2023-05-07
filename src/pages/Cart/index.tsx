import React, { useEffect } from 'react';
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import { AxiosResponse } from 'axios';
import a from '../../services';
import { Cart } from '../../interfaces';
import { formatCurrency } from '@bctc/components';

type Props = {};

const CartPage = (props: Props) => {
  const currentUserId = localStorage.getItem('currentUserId');
  const [cart, setCart] = React.useState<Cart | null>(null);

  const getCart = async () => {
    const response: AxiosResponse = await a.get(
      `/cart/${currentUserId}/student`
    );
    if (response.data) {
      const cartData: Cart = response.data;
      setCart(cartData);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      getCart();
    }
  }, [currentUserId]);

  const updateCartQuantity = async (cartItemId: number, quantity: number) => {
    const response: AxiosResponse = await a.put('/cart/quantity/', {
      cartItemId,
      quantity,
    });
    if (response.data) {
      getCart();
    }
  };

  const subtotal = cart?.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
    0
  );

  const tax = subtotal ? subtotal * 0.0875 : 0;

  const orderTotal = subtotal ? subtotal + tax : 0;

  return (
    <div className='bg-white'>
      <div className='max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Shopping Cart
        </h1>
        <form className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
          <section aria-labelledby='cart-heading' className='lg:col-span-7'>
            <h2 id='cart-heading' className='sr-only'>
              Items in your shopping cart
            </h2>

            <ul
              role='list'
              className='border-t border-b border-gray-200 divide-y divide-gray-200'
            >
              {cart?.cartItems.map((cartItem, i) => (
                <li key={i} className='flex py-6 sm:py-10'>
                  <div className='flex-shrink-0'>
                    <img
                      src={cartItem.product.thumbnailImage}
                      alt={cartItem.product.title}
                      className='object-cover object-center w-24 h-24 rounded-md sm:h-48 sm:w-48'
                    />
                  </div>

                  <div className='flex flex-col justify-between flex-1 ml-4 sm:ml-6'>
                    <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                      <div>
                        <div className='flex justify-between'>
                          <h3 className='text-sm'>
                            <a
                              href={`/product/${cartItem.product.slug}`}
                              className='font-medium text-gray-700 hover:text-gray-800'
                            >
                              {cartItem.product.title}
                            </a>
                          </h3>
                        </div>
                        <div className='flex mt-1 text-sm'></div>
                        <p className='mt-1 text-sm font-medium text-gray-900'>
                          {formatCurrency(cartItem.product.price)}
                        </p>
                        <p className='mt-1 text-sm font-normal text-gray-900 '>
                          Subtotal:{' '}
                          <span className='font-semibold'>
                            {formatCurrency(
                              cartItem.product.price * cartItem.quantity
                            )}
                          </span>
                        </p>
                      </div>

                      <div className='mt-4 sm:mt-0 sm:pr-9'>
                        <select
                          id={`quantity-${i}`}
                          name={`quantity-${i}`}
                          className='max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                          value={cartItem.quantity}
                          onChange={(e) => {
                            const value = e.target.value;
                            updateCartQuantity(cartItem.id, parseInt(value));
                          }}
                        >
                          {Array.from(Array(50).keys()).map((quantity) => (
                            <option key={quantity} value={quantity}>
                              {quantity}
                            </option>
                          ))}
                        </select>

                        <div className='absolute top-0 right-0'>
                          <button
                            type='button'
                            onClick={() => {
                              updateCartQuantity(cartItem.id, 0);
                            }}
                            className='inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500'
                          >
                            <span className='sr-only'>Remove</span>
                            <XMarkIcon className='w-5 h-5' aria-hidden='true' />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className='flex mt-4 space-x-2 text-sm text-gray-700'>
                      <CheckIcon
                        className='flex-shrink-0 w-5 h-5 text-green-500'
                        aria-hidden='true'
                      />

                      <span>In stock. Ships within 3 to 5 days.</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby='summary-heading'
            className='px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'
          >
            <h2
              id='summary-heading'
              className='text-lg font-medium text-gray-900'
            >
              Order summary
            </h2>

            <dl className='mt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <dt className='text-sm text-gray-600'>Subtotal</dt>
                <dd className='text-sm font-medium text-gray-900'>
                  {formatCurrency(subtotal)}
                </dd>
              </div>
              <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                <dt className='flex items-center text-sm text-gray-600'>
                  <span>Shipping estimate</span>
                  <a
                    href='/'
                    className='flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500'
                  >
                    <span className='sr-only'>
                      Learn more about how shipping is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className='w-5 h-5'
                      aria-hidden='true'
                    />
                  </a>
                </dt>
                <dd className='text-sm font-medium text-gray-900'>$5.00</dd>
              </div>
              <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                <dt className='flex text-sm text-gray-600'>
                  <span>Tax estimate</span>
                  <a
                    href='/'
                    className='flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500'
                  >
                    <span className='sr-only'>
                      Learn more about how tax is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className='w-5 h-5'
                      aria-hidden='true'
                    />
                  </a>
                </dt>
                <dd className='text-sm font-medium text-gray-900'>
                  {formatCurrency(tax)}
                </dd>
              </div>
              <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                <dt className='text-base font-medium text-gray-900'>
                  Order total
                </dt>
                <dd className='text-base font-medium text-gray-900'>
                  {formatCurrency(orderTotal)}
                </dd>
              </div>
            </dl>

            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
              >
                Checkout
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
