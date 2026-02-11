import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import City from './components/City';
import CountryItem from './components/CountryItem';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="product" element={<Product />} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />}>
        <Route index element={<p>List Of cities</p>} />
        <Route path="cities" element={<p>List Of cities</p>} />
        <Route path="countries" element={<p>Country</p>} />
        <Route path="form" element={<p>Forms</p>} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
