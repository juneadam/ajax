'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
  .then((response) => response.text())
  .then((responseData) =>{
    document.querySelector('#fortune-text').innerHTML = responseData;

  });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({ 'zipcode': zipcode })

  fetch(`/weather.json?${queryString}`)
    .then((response) => response.json())
    .then((moreResponseData) => {
       document.querySelector('#weather-info').innerHTML = moreResponseData['forecast'];       
    });

  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const url = '/order-melons.json';
  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,

  };
  fetch(`/order-melons.json`,{
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((updateResponse) => {

  if (updateResponse['code'] === 'OK'){
    document.querySelector('#order-status').classList.remove('order-error'); 
    document.querySelector('#order-status').innerHTML = updateResponse.msg;
  
  } else {
    document.querySelector('#order-status').classList.add('order-error'); 
    document.querySelector('#order-status').innerHTML = updateResponse.msg;
  }
});
}


function getDogImage(evt) {
  evt.preventDefault()
  const url = 'https://dog.ceo/api/breeds/image/random';
  fetch(`https://dog.ceo/api/breeds/image/random`)
  .then((response) => response.json())
  .then((dogImage) => {
    document.querySelector("#dog-image").insertAdjacentHTML('beforeend', `<img src='${dogImage['message']}'>`);
  });
  
}



  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
document.querySelector('#get-dog-image').addEventListener('click', getDogImage);
document.querySelector('#order-form').addEventListener('submit', orderMelons);
