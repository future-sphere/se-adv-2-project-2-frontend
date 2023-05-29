import queryString from 'query-string';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import a from '../../services';
import { Order } from '../../interfaces';

type Props = {};

const CheckoutSuccessPage = (props: Props) => {
  const location = useLocation();
  const paymentIntentId = queryString.parse(location.search).payment_intent;
  const [order, setOrder] = React.useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await a.get(`/orders/paymentIntent/${paymentIntentId}`);
      setOrder(response.data);
    };

    if (paymentIntentId) {
      fetchOrder();
    }
  }, [paymentIntentId]);
  console.log(order);

  return (
    <main className='grid min-h-full px-6 py-24 bg-white place-items-center sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-indigo-600'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
          Success
        </h1>
        <p className='mt-6 text-base leading-7 text-gray-600'>
          Your order #1 has been placed successfully.
        </p>
        <div className='flex items-center justify-center mt-10 gap-x-6'>
          <Link
            to='/'
            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Go back home
          </Link>
          <Link to={`/order/1`} className='text-sm font-semibold text-gray-900'>
            View Order <span aria-hidden='true'>&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccessPage;
