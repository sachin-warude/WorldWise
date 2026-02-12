import React from 'react';
import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import Message from './Message';
import Spinner from './Spinner';
import { useCity } from '../context/CityProvider';
export default function CountryList() {
  const { cities, isLoading } = useCity();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message={'Add your first city by clicking on a city on Map'} />
    );

  const countries = cities.reduce((acc, cur) => {
    if (!acc.map(el => el.country).includes(cur.country))
      return [...acc, { country: cur.country, emoji: cur.emoji }];
    else return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}
