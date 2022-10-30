import Navbar from '../../components/Navbar';

const collections = [
  {
    name: "Women's",
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-01.jpg',
    imageAlt: 'Woman wearing a comfortable cotton t-shirt.',
  },
  {
    name: "Men's",
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-02.jpg',
    imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.',
  },
  {
    name: 'Desk Accessories',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-03.jpg',
    imageAlt:
      'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
  },
];
const trendingProducts = [
  {
    id: 1,
    name: 'Leather Long Wallet',
    color: 'Natural',
    price: '$75',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  // More products...
];
const perks = [
  {
    name: 'Free returns',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description:
      'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
  },
  {
    name: 'Same day delivery',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
  },
  {
    name: 'All year discount',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: 'For the planet',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description:
      'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
  },
];
const footerNavigation = {
  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
};

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div className='bg-white'>
      {/* Mobile menu */}
      <Navbar />
      <main>
        {/* Hero section */}
        <div className='relative'>
          {/* Background image and overlap */}
          <div
            aria-hidden='true'
            className='absolute inset-0 hidden sm:flex sm:flex-col'
          >
            <div className='relative w-full flex-1 bg-gray-800'>
              <div className='absolute inset-0 overflow-hidden'>
                <img
                  src='https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg'
                  alt=''
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <div className='absolute inset-0 bg-gray-900 opacity-50' />
            </div>
            <div className='h-32 w-full bg-white md:h-40 lg:h-48' />
          </div>

          <div className='relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8'>
            {/* Background image and overlap */}
            <div
              aria-hidden='true'
              className='absolute inset-0 flex flex-col sm:hidden'
            >
              <div className='relative w-full flex-1 bg-gray-800'>
                <div className='absolute inset-0 overflow-hidden'>
                  <img
                    src='https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg'
                    alt=''
                    className='h-full w-full object-cover object-center'
                  />
                </div>
                <div className='absolute inset-0 bg-gray-900 opacity-50' />
              </div>
              <div className='h-48 w-full bg-white' />
            </div>
            <div className='relative py-32'>
              <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>
                Mid-Season Sale
              </h1>
              <div className='mt-4 sm:mt-6'>
                <a
                  href='#'
                  className='inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 font-medium text-white hover:bg-indigo-700'
                >
                  Shop Collection
                </a>
              </div>
            </div>
          </div>

          <section
            aria-labelledby='collection-heading'
            className='relative -mt-96 sm:mt-0'
          >
            <h2 id='collection-heading' className='sr-only'>
              Collections
            </h2>
            <div className='mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8'>
              {collections.map((collection) => (
                <div
                  key={collection.name}
                  className='group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-w-4 sm:aspect-h-5 sm:h-auto'
                >
                  <div>
                    <div
                      aria-hidden='true'
                      className='absolute inset-0 overflow-hidden rounded-lg'
                    >
                      <div className='absolute inset-0 overflow-hidden group-hover:opacity-75'>
                        <img
                          src={collection.imageSrc}
                          alt={collection.imageAlt}
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50' />
                    </div>
                    <div className='absolute inset-0 flex items-end rounded-lg p-6'>
                      <div>
                        <p aria-hidden='true' className='text-sm text-white'>
                          Shop the collection
                        </p>
                        <h3 className='mt-1 font-semibold text-white'>
                          <a href={collection.href}>
                            <span className='absolute inset-0' />
                            {collection.name}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section aria-labelledby='trending-heading'>
          <div className='mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32'>
            <div className='md:flex md:items-center md:justify-between'>
              <h2
                id='favorites-heading'
                className='text-2xl font-bold tracking-tight text-gray-900'
              >
                Trending Products
              </h2>
              <a
                href='#'
                className='hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block'
              >
                Shop the collection
                <span aria-hidden='true'> &rarr;</span>
              </a>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8'>
              {trendingProducts.map((product) => (
                <div key={product.id} className='group relative'>
                  <div className='h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80'>
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className='h-full w-full object-cover object-center'
                    />
                  </div>
                  <h3 className='mt-4 text-sm text-gray-700'>
                    <a href={product.href}>
                      <span className='absolute inset-0' />
                      {product.name}
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{product.color}</p>
                  <p className='mt-1 text-sm font-medium text-gray-900'>
                    {product.price}
                  </p>
                </div>
              ))}
            </div>

            <div className='mt-8 text-sm md:hidden'>
              <a
                href='#'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Shop the collection
                <span aria-hidden='true'> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <section
          aria-labelledby='perks-heading'
          className='border-t border-gray-200 bg-gray-50'
        >
          <h2 id='perks-heading' className='sr-only'>
            Our perks
          </h2>

          <div className='mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8'>
            <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0'>
              {perks.map((perk) => (
                <div
                  key={perk.name}
                  className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'
                >
                  <div className='md:flex-shrink-0'>
                    <div className='flow-root'>
                      <img
                        className='-my-1 mx-auto h-24 w-auto'
                        src={perk.imageUrl}
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0'>
                    <h3 className='text-base font-medium text-gray-900'>
                      {perk.name}
                    </h3>
                    <p className='mt-3 text-sm text-gray-500'>
                      {perk.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer aria-labelledby='footer-heading' className='bg-gray-50'>
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='border-t border-gray-200 py-20'>
            <div className='grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16'>
              {/* Image section */}
              <div className='col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1'>
                <img
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                  alt=''
                  className='h-8 w-auto'
                />
              </div>

              {/* Sitemap sections */}
              <div className='col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2'>
                <div className='grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8'>
                  <div>
                    <h3 className='text-sm font-medium text-gray-900'>
                      Products
                    </h3>
                    <ul role='list' className='mt-6 space-y-6'>
                      {footerNavigation.products.map((item) => (
                        <li key={item.name} className='text-sm'>
                          <a
                            href={item.href}
                            className='text-gray-500 hover:text-gray-600'
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className='text-sm font-medium text-gray-900'>
                      Company
                    </h3>
                    <ul role='list' className='mt-6 space-y-6'>
                      {footerNavigation.company.map((item) => (
                        <li key={item.name} className='text-sm'>
                          <a
                            href={item.href}
                            className='text-gray-500 hover:text-gray-600'
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-900'>
                    Customer Service
                  </h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.customerService.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <a
                          href={item.href}
                          className='text-gray-500 hover:text-gray-600'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter section */}
              <div className='mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1'>
                <h3 className='text-sm font-medium text-gray-900'>
                  Sign up for our newsletter
                </h3>
                <p className='mt-6 text-sm text-gray-500'>
                  The latest deals and savings, sent to your inbox weekly.
                </p>
                <form className='mt-2 flex sm:max-w-md'>
                  <label htmlFor='email-address' className='sr-only'>
                    Email address
                  </label>
                  <input
                    id='email-address'
                    type='text'
                    autoComplete='email'
                    required
                    className='w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  />
                  <div className='ml-4 flex-shrink-0'>
                    <button
                      type='submit'
                      className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='border-t border-gray-100 py-10 text-center'>
            <p className='text-sm text-gray-500'>
              &copy; 2021 Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
