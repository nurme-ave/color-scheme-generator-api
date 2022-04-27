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
  Get values of user input when clicking the submit button and
  pass them into fetchData() as arguments
*/
document.querySelector('.submit-button').addEventListener('click', () => {
  const colorValue = document.getElementById('color-input').value;
  const optionValue = document.getElementById('options').value;
  fetchData(colorValue, optionValue)
})

/*
  Fetch data from the Color API. I'm using default parameters here so if there's
  no user data (values) then by default we'll see the blue color scheme.
  Pass data into the renderContent() as an argument.
*/
function fetchData(colorValue='#0000ff', mode='monochrome') {
  fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue.slice(1)}&mode=${mode}`)
  .then((response) => response.json())
  .then((data) => {
    renderContent(data);
  });
}

// Render the colors and HEX values onto the page
function renderContent(collection) {
  let colorsHtml = '';
  let hexValuesHtml = '';
  for (let i = 0; i < collection.colors.length; i++) {
    colorsHtml += `
      <p class="color" style="background-color: ${collection.colors[i].hex.value};"></p>
    `
    hexValuesHtml += `<p class="hex-value">${collection.colors[i].hex.value}</p>`
  }
  document.getElementById('colors').innerHTML = colorsHtml;
  document.getElementById('hex-values').innerHTML = hexValuesHtml;
}

renderOptions();
fetchData();