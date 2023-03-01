import { Notify } from 'notiflix';

const URL = 'https://restcountries.com/v3.1/name/';
const params = 'fields=name,capital,population,flags,languages';
export const fetchCountries = function (name) {
  return fetch(`${URL}${name}?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .catch(error => {
      console.log(error);
      Notify.failure('Oops, there is no country with that name');
    });
};
