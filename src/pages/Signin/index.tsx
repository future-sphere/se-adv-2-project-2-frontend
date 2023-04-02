import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import a from '../../services';

export const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignin = async (e: any) => {
    e.preventDefault();
    const response = await a.post('/auth/signin', {
      email,
      password,
    });

    if (response.data.id) {
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    }
  };

  return (
    <>
      <div className='flex min-h-full'>
        <div className='flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='w-full max-w-sm mx-auto lg:w-96'>
            <div>
              <h2 className='mt-6 text-3xl font-bold tracking-tight text-gray-900'>
                Sign in to your account
              </h2>
              <div className='text-sm'>
                <Link
                  to='/signup'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Sign up for an account
                </Link>
              </div>
            </div>

            <div className='mt-8'>
              <div className='mt-6'>
                <form action='#' method='POST' className='space-y-6'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Email address
                    </label>
                    <div className='mt-2'>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        required
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={email}
                        className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Password
                    </label>
                    <div className='mt-2'>
                      <input
                        id='password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                        required
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        value={password}
                        className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <input
                        id='remember-me'
                        name='remember-me'
                        type='checkbox'
                        className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600'
                      />
                      <label
                        htmlFor='remember-me'
                        className='block ml-2 text-sm text-gray-900'
                      >
                        Remember me
                      </label>
                    </div>

                    <div className='text-sm'>
                      <a
                        href='#'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleSignin}
                      type='submit'
                      className='flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='relative flex-1 hidden w-0 lg:block'>
          <img
            className='absolute inset-0 object-cover w-full h-full'
            src='https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
            alt=''
          />
        </div>
      </div>
    </>
  );
};
