// import { Notify } from 'notiflix';

const URL = 'https://restcountries.com/v3.1/';
const params = 'fields=name,capital,population,flags,languages';

export const fetchCountries = async function (name) {
  const response = await fetch(`${URL}name/${name}?${params}`);

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();
  return data;
};
