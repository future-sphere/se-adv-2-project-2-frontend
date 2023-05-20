import React, { useEffect } from 'react';
import { Cart } from '../../interfaces';
import { AxiosResponse } from 'axios';
import a from '../../services';
import { formatCurrency } from '@bctc/components';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './Form';

const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey!);

export const CheckoutPage = () => {
  const currentUserId = localStorage.getItem('currentUserId');
  const [cart, setCart] = React.useState<Cart | null>(null);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);

  const getCart = async () => {
    const response: AxiosResponse = await a.get(
      `/cart/${currentUserId}/student`
    );
    if (response.data) {
      const cartData: Cart = response.data;
      setCart(cartData);
    }
  };

  const subtotal = cart?.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
    0
  );

  const tax = subtotal ? subtotal * 0.0875 : 0;

  const orderTotal = subtotal ? subtotal + tax : 0;

  const getPaymentIntent = async () => {
    const response: AxiosResponse = await a.post('/payment/intent', {
      amount: orderTotal,
    });

    if (response.data) {
      setClientSecret(response.data.client_secret);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      getCart();
    }
  }, [currentUserId]);

  useEffect(() => {
    if (orderTotal) {
      getPaymentIntent();
    }
  }, [orderTotal, cart]);

  return (
    <div className='bg-white'>
      {/* Background color split screen for large screens */}
      <div
        className='fixed top-0 left-0 hidden w-1/2 h-full bg-white lg:block'
        aria-hidden='true'
      />
      <div
        className='fixed top-0 right-0 hidden w-1/2 h-full bg-indigo-900 lg:block'
        aria-hidden='true'
      />

      <div className='relative grid grid-cols-1 mx-auto max-w-7xl gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16'>
        <h1 className='sr-only'>Checkout</h1>

        <section
          aria-labelledby='summary-heading'
          className='py-12 text-indigo-300 bg-indigo-900 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0'
        >
          <div className='max-w-2xl px-4 mx-auto lg:max-w-none lg:px-0'>
            <h2 id='summary-heading' className='sr-only'>
              Order summary
            </h2>

            <dl>
              <dt className='text-sm font-medium'>Amount due</dt>
              <dd className='mt-1 text-3xl font-bold tracking-tight text-white'>
                {formatCurrency(orderTotal)}
              </dd>
            </dl>

            <ul className='text-sm font-medium divide-y divide-white divide-opacity-10'>
              {cart?.cartItems.map((cartItem) => (
                <li
                  key={cartItem.id}
                  className='flex items-start py-6 space-x-4'
                >
                  <img
                    src={cartItem.product.thumbnailImage}
                    alt={cartItem.product.title}
                    className='flex-none object-cover object-center w-20 h-20 rounded-md'
                  />
                  <div className='flex-auto space-y-1'>
                    <h3 className='text-white'>{cartItem.product.title}</h3>
                    <p>{cartItem.product.description}</p>
                    <p className='flex items-center'>
                      <XMarkIcon
                        className='flex-shrink-0 w-4 h-4'
                        aria-hidden='true'
                      />

                      {cartItem.quantity}
                    </p>
                  </div>
                  <p className='flex-none text-base font-medium text-white'>
                    {formatCurrency(cartItem.product.price)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className='pt-6 space-y-6 text-sm font-medium border-t border-white border-opacity-10'>
              <div className='flex items-center justify-between'>
                <dt>Subtotal</dt>
                <dd>{formatCurrency(subtotal)}</dd>
              </div>

              <div className='flex items-center justify-between'>
                <dt>Shipping</dt>
                <dd>{formatCurrency(5)}</dd>
              </div>

              <div className='flex items-center justify-between'>
                <dt>Taxes</dt>
                <dd>{formatCurrency(tax)}</dd>
              </div>

              <div className='flex items-center justify-between pt-6 text-white border-t border-white border-opacity-10'>
                <dt className='text-base'>Total</dt>
                <dd className='text-base'>{formatCurrency(orderTotal)}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby='payment-and-shipping-heading'
          className='py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0'
        >
          <form>
            <div className='max-w-2xl px-4 mx-auto lg:max-w-none lg:px-0'>
              <div className='mt-10'>
                {clientSecret && (
                  <Elements options={{ clientSecret }} stripe={stripePromise}>
                    <CheckoutForm
                      currentUserId={currentUserId!}
                      subtotal={subtotal || 0}
                      tax={tax}
                      cart={cart!}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
