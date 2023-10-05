'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
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
  countriesContainer.style.opacity = 1;
};

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

// ******* CONSUMING  PROMISES*******
/* const getCountryData = function (country) {
  //? fetch ile promise oluşturuldu, promislerde then() kullanılabilir ve ald. arguman yanıt olacaktır
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json(); //?response (yanıt) daki verileri okumak istersek json()kullanılır ve bu dayeni bir promise olacak .Bu promise i yerine getirmek için yeni çağrı yapmalıyız then() kull
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};
getCountryData('turkey');
 */

// Arrow Function:
const getCountryData = function (country) {
  //country 1
  //? fetch ile promise oluşturuldu, promislerde then() kullanılabilir ve ald. arguman yanıt olacaktır
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(
      response => response.json() //?response (yanıt) daki verileri okumak istersek json()kullanılır ve bu dayeni bir promise olacak .Bu promise i yerine getirmek için yeni çağrı yapmalıyız then() kull
    )
    .then(data => {
      renderCountry(data[0]); //?Ülke bilgilerini getirecek

      //! neighbour
      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;
      //country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    //then e zincirlemek daha iyi diğer türlü fetch e zincirlersen call back func cehennemine geri dönmüş olursun gerek yok
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};
getCountryData('turkey');
//getCountryData('germany');
