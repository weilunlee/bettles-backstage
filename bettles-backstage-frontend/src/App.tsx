import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from "./stores/store"
import Layout from './components/layout';
// import Preloader from './components/preloader';

function App() {
  return (
    <Provider store={store} >
      <div className='w-screen h-screen flex flex-col text-amber-950 overflow-hidden'>
        <Layout />
      </div>
    </Provider>
    
  );
}

export default App;
