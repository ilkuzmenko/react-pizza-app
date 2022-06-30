import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import './scss/app.scss';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart"*/ './pages/Cart'),
  loading: () => <div>Триває завантаження ...</div>,
});

const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza"*/ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound"*/ './pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<div>Триває завантаження ...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
