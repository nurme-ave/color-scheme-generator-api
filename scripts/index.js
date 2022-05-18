import { fetchData } from './fetch-data.js';

let colorValue;

// Options in the SELECT tag
const optionsArr = [
  'monochrome',
  'monochrome-dark',
  'monochrome-light',
  'analogic',
  'analogic-complement',
  'triad',
  'quad',
];

// Render options in the SELECT tag
function renderOptions() {
  let optionsHtml = '';
  optionsHtml += optionsArr.map((option) => {
    return `<option value="${option}">${option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}</option>`;
  });
  document.getElementById('options').innerHTML = optionsHtml;
}

/*
  Get the color value and color mode from the user when submitting
  the form and pass the data into fetchData() as arguments
*/
document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  colorValue = document.getElementById('color-input').value;
  const optionMode = document.getElementById('options').value;

  fetchData(colorValue, optionMode);
})

renderOptions();
fetchData();

export { colorValue };