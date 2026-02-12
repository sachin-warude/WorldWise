import React, { createContext, useContext, useEffect, useState } from 'react';
import { Children } from 'react';

const CityContext = createContext();
function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:9000/cities');
        if (!res.ok) throw new Error('Something went wrong');
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  function getCity(id) {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:9000/cities/${id}`);
        if (!res.ok) throw new Error('Something went wrong');
        const data = await res.json();
        setCurrentCity(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }
  return (
    <CityContext.Provider value={{ cities, isLoading, getCity, currentCity }}>
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error('⛔useCity must be used inside CityProvider');
  return context;
}
export { CityProvider, useCity };
