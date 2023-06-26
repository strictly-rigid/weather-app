import { refs } from './refs';

let BASE_URL = 'http://api.weatherapi.com/v1';
const API_KEY = 'dad5bd8d50304f51883165435232406';

refs.btnSubmit.addEventListener('click', getWeather);

function getWeather(event) {
  event.preventDefault();
  const location = refs.input.value.trim().toLowerCase();
  console.log(location);
  clearWeather();

  return fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7`)
    .then(response => response.json())
    .then(data => {
      refs.locationCity.textContent = data.location.name;
      refs.locationCountry.textContent = data.location.country;
      console.log(data);
      return data.forecast.forecastday;
    })
    .then(workingData => {
      console.log(workingData);
      return workingData
        .map(item => {
          return `
        <div class="day_item">
        <p class="date">${item.date}</p>
        <img
          class="weather_image"
          src="${item.day.condition.icon}"
          alt="weather picture"
        />
        <p class="min_temp">${item.day.mintemp_c} °C</p>
        <p class="max_temp">${item.day.maxtemp_c} °C</p>
        </div>
            `;
        })
        .join('');
    })
    .then(markup => {
      refs.wrapper.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => {
      console.log(error);
    });
}

function clearWeather() {
  refs.locationCity.textContent = '';
  refs.locationCountry.textContent = '';
  refs.wrapper.innerHTML = '';
}
