'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].code} (${
    data.currencies[0].symbol
  })</p>
    </div>
  </article>
   `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //  countriesContainer.style.opacity = 1;
};
//! AJAX: XMLHttpRecuest() --> eski yontem
/* const getCountryData = function (country, className ='') {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //const data = JSON.parse(this.responseText[0]);
    const [data] = JSON.parse(this.responseText);

    //console.log(data);

    const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].code} (${
      data.currencies[0].symbol
    })</p>
    </div>
  </article>
   `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('turkey', 'neighbour'); */
// getCountryData('korea');
// getCountryData('scotland');

// **************

/* const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //const data = JSON.parse(this.responseText[0]);
    const [data] = JSON.parse(this.responseText);

    //Render country
    renderCountry(data);
    console.log(data);

    //Get neighbour country
    const neighbour = data.borders?.[0];
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbour('turkey');
    */
//-------------------guncel yontem-------------------
// ******* CONSUMING  PROMISES *******
/* const getCountryData = function (country) {
  //? fetch ile promise oluşturuldu
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json(); //?response daki verileri okuma
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};
getCountryData('turkey');
 */

// Arrow Function Style:
/* const getCountryData = function (country) {
  //country 1
  //? fetch ile promise oluşturuldu
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      if (!response.ok)
        //hata fırlat
        throw new Error(`Country not found (${response.status})`);
      return response.json(); //?response daki verileri okuma
    })
    .then(data => {
      renderCountry(data[0]); //?Ülke bilgilerini getirecek

      //! neighbour
      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;
      //country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    //hata yakalama
    .catch(err => {
      console.log(`${err} 🧨🧨🧨`);
      renderError(`Something went wrong 🧨🧨 ${err}.Try again! `);
      // Promise nin resolved veya rejected durumundan bağımsız olarak ikisi için çalışır
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};  */

 const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();//?response daki verileri okuma
  });
};
const getCountryData = function (country) {
  //country 1
  //? fetch ile promise oluşturuldu
  getJSON(`https://restcountries.com/v2/name/${country}`)
    .then(data => {
      renderCountry(data[0]); //?Ülke bilgilerini getirecek

      //! neighbour-country 2
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('There is no neighbour found!');
      return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`,'Country not found');
    })
    .then(data => renderCountry(data, 'neighbour'))
    //?hata yakalama
    .catch(err => {
      console.log(`${err} 🧨🧨🧨`);
      renderError(`Something went wrong 🧨🧨 ${err}.Try again! `);
      //? finally, promise nin resolved veya rejected durumundan bağımsız olarak ikisi için çalışır
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}; 
btn.addEventListener('click', function () {
  getCountryData('turkey');
  //getCountryData('germany');
});

getCountryData('australia');
