import React from 'react';

import Layout from '@components/Layout';
import ROUTES from '@config/routes';
import About from '@pages/About';
import BuyNow from '@pages/BuyNow';
import Cart from '@pages/Cart';
import Categories from '@pages/Categories';
import Product from '@pages/Product';
import Products from '@pages/Products';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.index} element={<Layout />}>
          <Route path={`${ROUTES.product}/:id`} element={<Product />} />
          <Route path={ROUTES.categories} element={<Categories />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.cart} element={<Cart />} />
          <Route path={`${ROUTES.buyNow}/:id`} element={<BuyNow />} />
          <Route
            path={ROUTES.all}
            element={<Navigate to={ROUTES.index} replace />}
          />
          <Route index element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
