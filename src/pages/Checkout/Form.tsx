import {
  DropdownData,
  SingleDropdown,
  SingleSearchInput,
  capitalize,
} from '@bctc/components';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React from 'react';
import { states } from './states';
import { DropdownMenu } from '../../components/DropdownMenu';
import a from '../../services';
import { Cart } from '../../interfaces';

type Props = {
  cart: Cart;
  subtotal: number;
  tax: number;
  currentUserId: string;
};

const CheckoutForm = ({ cart, subtotal, tax, currentUserId }: Props) => {
  const [message, setMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const [address, setAddress] = React.useState<{
    street: string;
    city: string;
    state: string;
    postalCode: string;
  }>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    if (
      !address.street ||
      !address.city ||
      !address.state ||
      !address.postalCode
    ) {
      setMessage('Please fill out all fields.');
      return;
    }

    setIsLoading(true);

    const response = await a.post('/order', {
      shippingAddressStreet: address,
      shippingAddressCity: address.city,
      shippingAddressState: address.state,
      shippingAddressPostalCode: address.postalCode,
      cartId: cart.id,
      subtotal,
      tax,
      studentId: currentUserId,
    });

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/checkout/success',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message!);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h3 className='text-lg font-medium text-gray-900'>Payment details</h3>
      <div className='mt-6'>
        <PaymentElement id='payment-element' />
      </div>
      <div className='mt-10'>
        <h3 className='text-lg font-medium text-gray-900'>Shipping address</h3>

        <div className='grid grid-cols-1 mt-6 gap-x-4 gap-y-6 sm:grid-cols-3'>
          <div className='sm:col-span-3'>
            <label
              htmlFor='address'
              className='block text-sm font-medium text-gray-700'
            >
              Address
            </label>
            <div className='mt-1'>
              <input
                onChange={(e) => {
                  setAddress({ ...address, street: e.target.value });
                }}
                value={address.street}
                type='text'
                id='address'
                name='address'
                autoComplete='street-address'
                className='block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='city'
              className='block text-sm font-medium text-gray-700'
            >
              City
            </label>
            <div className='mt-1'>
              <input
                onChange={(e) => {
                  setAddress({ ...address, city: e.target.value });
                }}
                value={address.city}
                type='text'
                id='city'
                name='city'
                autoComplete='address-level2'
                className='block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='region'
              className='block text-sm font-medium text-gray-700'
            >
              State / Province
            </label>
            <div className='mt-1'>
              <select
                id='location'
                name='location'
                className='block w-full py-1.5 pl-3 pr-10 text-gray-900 border-0 rounded-md ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                defaultValue='Canada'
              >
                {states.map((state) => (
                  <option key={state.name} value={state.abbreviation}>
                    {capitalize(state.name)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor='postal-code'
              className='block text-sm font-medium text-gray-700'
            >
              Postal code
            </label>
            <div className='mt-1'>
              <input
                type='text'
                id='postal-code'
                name='postal-code'
                autoComplete='postal-code'
                className='block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                onChange={(e) => {
                  setAddress({ ...address, postalCode: e.target.value });
                }}
                value={address.postalCode}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end pt-6 mt-10 border-t border-gray-200'>
        <button
          type='submit'
          onClick={handleSubmit}
          className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
        >
          {isLoading ? 'Processing...' : 'Pay now'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
