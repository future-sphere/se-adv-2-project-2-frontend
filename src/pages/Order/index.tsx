import React, { useEffect } from 'react';
import { formatPrice } from '../../helpers';
import { Product } from '../../interfaces';
import a from '../../services';

type Props = {};

const OrderDetailPage = (props: Props) => {
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await a.get('/orders/1');
      console.log(response.data);
      setProducts(response.data.products);
    };
    fetchData();
  }, []);

  return (
    <main className='px-4 pt-16 pb-24 bg-white sm:px-6 sm:pt-24 lg:px-8 lg:py-32'>
      <div className='max-w-3xl mx-auto'>
        <div className='max-w-xl'>
          <h1 className='text-base font-medium text-indigo-600'>Thank you!</h1>
          <p className='mt-2 text-4xl font-bold tracking-tight'>
            It's on the way!
          </p>
          <p className='mt-2 text-base text-gray-500'>
            Your order #14034056 has shipped and will be with you soon.
          </p>

          <dl className='mt-12 text-sm font-medium'>
            <dt className='text-gray-900'>Tracking number</dt>
            <dd className='mt-2 text-indigo-600'>51547878755545848512</dd>
          </dl>
        </div>

        <section
          aria-labelledby='order-heading'
          className='mt-10 border-t border-gray-200'
        >
          <h2 id='order-heading' className='sr-only'>
            Your order
          </h2>

          <h3 className='sr-only'>Items</h3>
          {products.map((product) => (
            <div
              key={product.id}
              className='flex py-10 space-x-6 border-b border-gray-200'
            >
              <img
                src={product.thumbnailImage}
                alt={product.title}
                className='flex-none object-cover object-center w-20 h-20 bg-gray-100 rounded-lg sm:h-40 sm:w-40'
              />
              <div className='flex flex-col flex-auto'>
                <div>
                  <h4 className='font-medium text-gray-900'>
                    <a href={`/products/${product.id}`}>{product.title}</a>
                  </h4>
                  <p className='mt-2 text-sm text-gray-600'>
                    {product.description}
                  </p>
                </div>
                <div className='flex items-end flex-1 mt-6'>
                  <dl className='flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6'>
                    <div className='flex'>
                      <dt className='font-medium text-gray-900'>Quantity</dt>
                      <dd className='ml-2 text-gray-700'>{product.quantity}</dd>
                    </div>
                    <div className='flex pl-4 sm:pl-6'>
                      <dt className='font-medium text-gray-900'>Price</dt>
                      <dd className='ml-2 text-gray-700'>
                        {formatPrice(product.price)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className='sm:ml-40 sm:pl-6'>
            <h3 className='sr-only'>Your information</h3>

            <h4 className='sr-only'>Addresses</h4>
            <dl className='grid grid-cols-2 py-10 text-sm gap-x-6'>
              <div>
                <dt className='font-medium text-gray-900'>Shipping address</dt>
                <dd className='mt-2 text-gray-700'>
                  <address className='not-italic'>
                    <span className='block'>Kristin Watson</span>
                    <span className='block'>7363 Cynthia Pass</span>
                    <span className='block'>Toronto, ON N3Y 4H8</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className='font-medium text-gray-900'>Billing address</dt>
                <dd className='mt-2 text-gray-700'>
                  <address className='not-italic'>
                    <span className='block'>Kristin Watson</span>
                    <span className='block'>7363 Cynthia Pass</span>
                    <span className='block'>Toronto, ON N3Y 4H8</span>
                  </address>
                </dd>
              </div>
            </dl>

            <h4 className='sr-only'>Payment</h4>
            <dl className='grid grid-cols-2 py-10 text-sm border-t border-gray-200 gap-x-6'>
              <div>
                <dt className='font-medium text-gray-900'>Payment method</dt>
                <dd className='mt-2 text-gray-700'>
                  <p>Apple Pay</p>
                  <p>Mastercard</p>
                  <p>
                    <span aria-hidden='true'>••••</span>
                    <span className='sr-only'>Ending in </span>1545
                  </p>
                </dd>
              </div>
              <div>
                <dt className='font-medium text-gray-900'>Shipping method</dt>
                <dd className='mt-2 text-gray-700'>
                  <p>DHL</p>
                  <p>Takes up to 3 working days</p>
                </dd>
              </div>
            </dl>

            <h3 className='sr-only'>Summary</h3>

            <dl className='pt-10 space-y-6 text-sm border-t border-gray-200'>
              <div className='flex justify-between'>
                <dt className='font-medium text-gray-900'>Subtotal</dt>
                <dd className='text-gray-700'>$36.00</dd>
              </div>
              <div className='flex justify-between'>
                <dt className='flex font-medium text-gray-900'>
                  Discount
                  <span className='ml-2 rounded-full bg-gray-200 py-0.5 px-2 text-xs text-gray-600'>
                    STUDENT50
                  </span>
                </dt>
                <dd className='text-gray-700'>-$18.00 (50%)</dd>
              </div>
              <div className='flex justify-between'>
                <dt className='font-medium text-gray-900'>Shipping</dt>
                <dd className='text-gray-700'>$5.00</dd>
              </div>
              <div className='flex justify-between'>
                <dt className='font-medium text-gray-900'>Total</dt>
                <dd className='text-gray-900'>$23.00</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
};

export default OrderDetailPage;
