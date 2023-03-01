// HTML:
{
  /* <input type="text" id="search-box" />
<ul class="country-list"></ul>
<div class="country-info"></div> */
}

const DEBOUNCE_DELAY = 300;

import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);

function onSearchInput(e) {
  const searchValue = e.target.value.trim();
  // console.log(searchValue);

  clearInnerInterface();

  if (searchValue === '') {
    return;
  }

  fetchCountries(searchValue)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      data.forEach(el => {
        if (data.length === 1) {
          showCountryInfo(el);
        } else {
          showCountryList(el);
        }
      });
    })
    .catch(error => console.log(error));
}

function showCountryInfo({ name, capital, flags, languages, population }) {
  const markup = `<div class="row title">
  <img class="flag-img" src="${flags.svg}" alt="The national flag of ${
    name.common
  }" width="28" height="auto">
  <h2 class="country-name">${name.official}</h2>
  </div>
  <ul class="common-info">
  <li class="row"><h3>Capital:</h3><p>${capital[0]}</p>
  </li>
  <li class="row"><h3>Languages:</h3><p>${Object.values(languages).join(
    ', '
  )}</p>
  </li>
  <li class="row"><h3>Population:</h3><p>${population}</p>
  </li>
</ul>`;

  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function showCountryList({ name, flags }) {
  const markup = `<div class="row title">
  <img class="flag-img" src="${flags.svg}" alt="The national flag of ${name.common}" width="28" height="auto">
  <h2 class="country-name">${name.common}</h2>
  </div>`;

  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function clearInnerInterface() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
