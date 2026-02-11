import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import City from './components/City';
import CountryItem from './components/CountryItem';
import CityList from './components/CityList';
import CountryList from './components/CountryList';

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:9000/cities');
        if (!res.ok) throw new Error('Something went wrong');
        const data = await res.json();
        setCities(data);
      } catch {
        err => console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="product" element={<Product />} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />}>
        <Route
          index
          element={<CityList cities={cities} isLoading={isLoading} />}
        />
        <Route
          path="cities"
          element={<CityList cities={cities} isLoading={isLoading} />}
        />
        <Route
          path="countries"
          element={<CountryList cities={cities} isLoading={isLoading} />}
        />
        <Route path="form" element={<p>Forms</p>} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
