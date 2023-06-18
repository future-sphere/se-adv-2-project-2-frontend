import {
  ChatBubbleBottomCenterTextIcon,
  CheckIcon,
  ShieldCheckIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { classNames, formatPrice } from '../../helpers';
import { productPlaceholder } from '../../constants';
import { Product } from '../../interfaces';
import a from '../../services';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { notify, error } from '@bctc/components';
import { useHookstate } from '@hookstate/core';
import { globalCartItemCount } from '../../states';

type Props = {};

const policies = [
  {
    name: 'Free delivery all year long',
    description:
      'Name another place that offers year long free delivery? We’ll be waiting. Order now and you’ll get delivery absolutely free.',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg',
  },
  {
    name: '24/7 Customer Support',
    description:
      'Or so we want you to believe. In reality our chat widget is powered by a naive series of if/else statements that churn out canned responses. Guaranteed to irritate.',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg',
  },
  {
    name: 'Fast Shopping Cart',
    description:
      "Look at the cart in that icon, there's never been a faster cart. What does this mean for the actual checkout experience? I don't know.",
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg',
  },
  {
    name: 'Gift Cards',
    description:
      "We sell these hoping that you will buy them for your friends and they will never actually use it. Free money for us, it's great.",
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
  },
];

const ProductPage = (props: Props) => {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  const [product, setProduct] = React.useState<Product | null>(null);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState(1);
  const cartItemCount = useHookstate(globalCartItemCount);

  const fetchProduct = async () => {
    a.get('/products/' + slug).then((res) => {
      setProduct(res.data);
    });
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const averageReviewRating = product
    ? product.reviews.reduce((acc, item) => {
        return acc + item.rating;
      }, 0) / product.reviews.length
    : 0;

  const handleReviewSubmit = () => {
    setLoading(true);
    a.post('/reviews', {
      productId: product?.id,
      rating: selectedRating,
      comment: review,
    }).then((res) => {
      setReviewModalOpen(false);
      setReview('');
      fetchProduct();
      setLoading(false);
    });
  };

  const handleReviewDelete = (id: number) => {
    setLoading(true);
    a.delete('/reviews/' + id).then((res) => {
      fetchProduct();
      setLoading(false);
    });
  };

  const handleAddToBag = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const productId = product?.id;
    const userId = localStorage.getItem('currentUserId');

    try {
      const response = await a.post('/cart', {
        productId,
        userId,
        quantity: 1,
      });
      if (response.data.id) {
        cartItemCount.set(cartItemCount.value + 1);
        notify({
          title: 'Success',
          description: `Added product ${product?.title} to cart!`,
        });
      } else {
        error('Something went wrong');
      }
    } catch (err) {
      error('Something went wrong');
    }
  };

  return (
    product && (
      <div>
        {/* Product */}
        <div className='bg-white'>
          <div className='max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 sm:pt-24 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
            {/* Product details */}
            <div className='lg:max-w-lg lg:self-end'>
              <nav aria-label='Breadcrumb'>
                <ol className='flex items-center space-x-2'>
                  <li>
                    <div className='flex items-center text-sm'>
                      <Link
                        to={`/category/${product.category.slug}}`}
                        className='font-medium text-gray-500 hover:text-gray-900'
                      >
                        {product.category.title}
                      </Link>
                      <svg
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        aria-hidden='true'
                        className='flex-shrink-0 w-5 h-5 ml-2 text-gray-300'
                      >
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center text-sm'>
                      <Link
                        to={`/subcategory/${product.subCategory.slug}}`}
                        className='font-medium text-gray-500 hover:text-gray-900'
                      >
                        {product.subCategory.title}
                      </Link>
                      <svg
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        aria-hidden='true'
                        className='flex-shrink-0 w-5 h-5 ml-2 text-gray-300'
                      >
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center text-sm'>
                      <Link
                        to={`/product/${product.slug}`}
                        className='font-medium text-gray-500 hover:text-gray-900'
                      >
                        {product.title}
                      </Link>
                    </div>
                  </li>
                </ol>
              </nav>

              <div className='mt-4'>
                <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                  {product.title}
                </h1>
              </div>

              <section aria-labelledby='information-heading' className='mt-4'>
                <h2 id='information-heading' className='sr-only'>
                  Product information
                </h2>

                <div className='flex items-center'>
                  <p className='text-lg text-gray-900 sm:text-xl'>
                    {formatPrice(product.price || 0)}
                  </p>

                  <div className='pl-4 ml-4 border-l border-gray-300'>
                    <h2 className='sr-only'>Reviews</h2>
                    <div className='flex items-center'>
                      <div>
                        <div className='flex items-center'>
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                averageReviewRating > rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-200',

                                'h-5 w-5 flex-shrink-0',
                              )}
                              aria-hidden='true'
                            />
                          ))}
                        </div>
                        <p className='sr-only'>
                          {averageReviewRating} out of 5 stars
                        </p>
                      </div>
                      <p className='ml-2 text-sm text-gray-500'>
                        {product.reviews.length} reviews
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mt-4 space-y-6'>
                  <p className='text-base text-gray-500'>
                    {product?.description}
                  </p>
                </div>

                <div className='flex items-center mt-6'>
                  <CheckIcon
                    className='flex-shrink-0 w-5 h-5 text-green-500'
                    aria-hidden='true'
                  />
                  <p className='ml-2 text-sm text-gray-500'>
                    {product.quantity} left in stock and ready to ship
                  </p>
                </div>
              </section>
            </div>

            {/* Product image */}
            <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
              <div className='overflow-hidden rounded-lg aspect-w-1 aspect-h-1'>
                <img
                  src={product.thumbnailImage}
                  alt='Front of men&#039;s Basic Tee in black.'
                  className='object-cover object-center w-full h-full'
                />
              </div>
            </div>

            {/* Product form */}
            <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
              <section aria-labelledby='options-heading'>
                <h2 id='options-heading' className='sr-only'>
                  Product options
                </h2>

                <form>
                  <div className='mt-10'>
                    <button
                      onClick={handleAddToBag}
                      className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                    >
                      Add to bag
                    </button>
                  </div>
                  <div className='mt-6 text-center'>
                    <Link
                      to='#'
                      className='inline-flex text-base font-medium group'
                    >
                      <ShieldCheckIcon
                        className='flex-shrink-0 w-6 h-6 mr-2 text-gray-400 group-hover:text-gray-500'
                        aria-hidden='true'
                      />
                      <span className='text-gray-500 hover:text-gray-700'>
                        Lifetime Guarantee
                      </span>
                    </Link>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>

        <div className='max-w-2xl px-4 py-24 mx-auto sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8'>
          {/* Details section */}
          <section aria-labelledby='details-heading'>
            <div className='flex flex-col items-center text-center'>
              <h2
                id='details-heading'
                className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'
              >
                {product.highlightTitle}
              </h2>
              <p className='max-w-3xl mt-3 text-lg text-gray-600'>
                {product.highlightDescription}
              </p>
            </div>

            <div className='grid grid-cols-1 mt-16 gap-y-16 lg:grid-cols-2 lg:gap-x-8'>
              {product.productHighlights.map((highlight) => (
                <div>
                  <div className='w-full overflow-hidden rounded-lg aspect-w-3 aspect-h-2'>
                    <img
                      src={highlight.image}
                      alt='Drawstring top with elastic loop closure and textured interior padding.'
                      className='object-cover object-center w-full h-full'
                    />
                  </div>
                  <p className='mt-8 text-lg font-bold text-gray-500'>
                    {highlight.title}
                  </p>
                  <p className='mt-1 text-base text-gray-500'>
                    {highlight.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Policies section */}
          <section aria-labelledby='policy-heading' className='mt-16 lg:mt-24'>
            <h2 id='policy-heading' className='sr-only'>
              Our policies
            </h2>
            <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8'>
              {policies.map((policy) => (
                <div key={policy.name}>
                  <img src={policy.imageSrc} alt='' className='w-auto h-24' />
                  <h3 className='mt-6 text-base font-medium text-gray-900'>
                    {policy.name}
                  </h3>
                  <p className='mt-3 text-base text-gray-500'>
                    {policy.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section aria-labelledby='reviews-heading' className='bg-white'>
          <div className='max-w-2xl px-4 py-24 mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:py-32 lg:px-8'>
            <div className='lg:col-span-4'>
              <h2
                id='reviews-heading'
                className='text-2xl font-bold tracking-tight text-gray-900'
              >
                Customer Reviews
              </h2>

              <div className='flex items-center mt-3'>
                <div>
                  <div className='flex items-center'>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          averageReviewRating > rating
                            ? 'text-yellow-400'
                            : 'text-gray-300',
                          'flex-shrink-0 h-5 w-5',
                        )}
                        aria-hidden='true'
                      />
                    ))}
                  </div>
                  <p className='sr-only'>
                    {averageReviewRating} out of 5 stars
                  </p>
                </div>
                <p className='ml-2 text-sm text-gray-900'>
                  Based on {product.reviews.length} reviews
                </p>
              </div>

              <div className='mt-6'>
                <h3 className='sr-only'>Review data</h3>

                <dl className='space-y-3'>
                  {[5, 4, 3, 2, 1].map((count) => {
                    const numberOfReviewsMatched = product.reviews.filter(
                      (review) => review.rating === count,
                    ).length;
                    return (
                      <div key={count} className='flex items-center text-sm'>
                        <dt className='flex items-center flex-1'>
                          <p className='w-3 font-medium text-gray-900'>
                            {count}
                            <span className='sr-only'> star reviews</span>
                          </p>
                          <div
                            aria-hidden='true'
                            className='flex items-center flex-1 ml-1'
                          >
                            <StarIcon
                              className={classNames(
                                numberOfReviewsMatched > 0
                                  ? 'text-yellow-400'
                                  : 'text-gray-300',
                                'flex-shrink-0 h-5 w-5',
                              )}
                              aria-hidden='true'
                            />

                            <div className='relative flex-1 ml-3'>
                              <div className='h-3 bg-gray-100 border border-gray-200 rounded-full' />
                              {numberOfReviewsMatched > 0 ? (
                                <div
                                  className='absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full'
                                  style={{
                                    width: `calc(${numberOfReviewsMatched} / ${product.reviews.length} * 100%)`,
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        </dt>
                        <dd className='w-10 ml-3 text-sm text-right text-gray-900 tabular-nums'>
                          {Math.round(
                            (numberOfReviewsMatched / product.reviews.length) *
                              100,
                          )}
                          %
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>

              <div className='mt-10'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Share your thoughts
                </h3>
                <p className='mt-1 text-sm text-gray-600'>
                  If you’ve used this product, share your thoughts with other
                  customers
                </p>

                <button
                  onClick={() => setReviewModalOpen(true)}
                  className='inline-flex items-center justify-center w-full px-8 py-2 mt-6 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 sm:w-auto lg:w-full'
                >
                  Write a review
                </button>
              </div>
            </div>

            <div className='mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0'>
              <h3 className='sr-only'>Recent reviews</h3>

              <div className='flow-root'>
                <div className='-my-12 divide-y divide-gray-200'>
                  {product.reviews.map((review) => (
                    <div key={review.id} className='relative py-12'>
                      <TrashIcon
                        onClick={() => handleReviewDelete(review.id)}
                        className='absolute right-0 w-10 h-10 p-2 text-gray-300 cursor-pointer top-12'
                      />
                      <div className='flex items-center'>
                        <img
                          src={review.student.avatar || productPlaceholder}
                          alt={`${review.student.firstName}.`}
                          className='w-12 h-12 rounded-full'
                        />
                        <div className='ml-4'>
                          <h4 className='text-sm font-bold text-gray-900'>
                            {review.student.firstName} {review.student.lastName}
                          </h4>
                          <div className='flex items-center mt-1'>
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  review.rating > rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300',
                                  'h-5 w-5 flex-shrink-0',
                                )}
                                aria-hidden='true'
                              />
                            ))}
                          </div>
                          <p className='sr-only'>
                            {review.rating} out of 5 stars
                          </p>
                        </div>
                      </div>

                      <div
                        className='mt-4 space-y-6 text-base italic text-gray-600'
                        dangerouslySetInnerHTML={{ __html: review.comment }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Transition.Root show={isReviewModalOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-10'
            initialFocus={cancelButtonRef}
            onClose={setReviewModalOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 z-10 overflow-y-auto'>
              <div className='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                  enterTo='opacity-100 translate-y-0 sm:scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                  leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                >
                  <Dialog.Panel className='relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg'>
                    <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
                      <div className='sm:flex sm:items-start'>
                        <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                          <ChatBubbleBottomCenterTextIcon
                            className='w-6 h-6 text-blue-600'
                            aria-hidden='true'
                          />
                        </div>
                        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                          <Dialog.Title
                            as='h3'
                            className='text-lg font-medium leading-6 text-gray-900'
                          >
                            Leave a review
                          </Dialog.Title>
                          <div className='mt-2'>
                            <p className='text-sm text-gray-500'>
                              Your review will be posted publicly on the web, so
                              be nice.
                            </p>
                          </div>
                          <div className='space-y-2'>
                            <RadioGroup
                              value={selectedRating}
                              onChange={setSelectedRating}
                            >
                              <RadioGroup.Label className='block text-sm font-medium text-gray-700'>
                                Choose a label color
                              </RadioGroup.Label>
                              <div className='flex items-center mt-4 space-x-3'>
                                {[1, 2, 3, 4, 5].map((rating, index) => (
                                  <RadioGroup.Option key={index} value={rating}>
                                    <StarIcon
                                      className={classNames(
                                        'w-8 h-8',
                                        selectedRating >= rating
                                          ? 'text-yellow-400'
                                          : 'text-gray-300',
                                      )}
                                    />
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>

                            <textarea
                              rows={4}
                              onChange={(e) => setReview(e.target.value)}
                              value={review}
                              name='comment'
                              id='comment'
                              className='block w-full p-2 border-gray-900 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                              defaultValue={''}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6'>
                      <button
                        type='button'
                        disabled={loading}
                        className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={handleReviewSubmit}
                      >
                        {loading ? 'Posting...' : 'Post review'}
                      </button>
                      <button
                        type='button'
                        className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={() => setReviewModalOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    )
  );
};

export default ProductPage;
