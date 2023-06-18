import React, { useEffect } from 'react';
import logo from './logo.svg';
import a from './services';

function App() {
  useEffect(() => {
    a.get('/health').then((res) => {
      // console.log(res.data);
    });
  }, []);

  return <h1 className='text-3xl font-bold underline'>Hello world!</h1>;
}

export default App;
