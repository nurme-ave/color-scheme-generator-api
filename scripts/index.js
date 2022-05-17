
/* 
  Fixing the mobile viewport problem with 'height: 100vh'
  which does not apply correctly on mobile devices due to
  the address bar on top of the screen.
 */

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});


/*
  START OF THE APP
*/

const colorsEl = document.getElementById('colors');
const colorNamesEl = document.getElementById('color-names');
const hexValuesEl = document.getElementById('hex-values');
let colorValue;
let newBkgColor;

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
  the form after which pass the data into fetchData() as arguments
*/
document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  colorValue = document.getElementById('color-input').value;
  const optionMode = document.getElementById('options').value;

  fetchData(colorValue, optionMode);
})

/*
  Fetch data from the Color API. I'm using default parameters here so if there's
  no user data (values) then by default these parameters will be used.
  After fetching the data I pass it into the renderContent() as an argument.
*/
async function fetchData(colorValue='#0000ff', mode='monochrome', format='json', count=5) {
  try {
    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue.slice(1)}&format=${format}&mode=${mode}&count=${count}`);
    const data = await response.json();
    newBkgColor = data.seed.contrast.value;
    renderContent(data);
  } catch (err) {
    console.error(err);
    colorsEl.innerHTML = 
    `<p class="error-message">
      So sorry! Some kind of error occurred :(
      <span>Please refresh the page. If the problem persists, please let us know</span>
      <span class="error-message-email">error.messages@example.com</span>
    </p>`
  }
}

/*
  First detect if we have input from the user,
  if yes - launch changeColors() to change the
  color scheme on the page according to the 
  user input.
  Render the colors and HEX values onto the page
*/
function renderContent(collection) {
  if (colorValue) { changeColors() }

  let colorsHtml = '';
  let colorNamesHtml = '';
  let hexValuesHtml = '';

  for (let i = 0; i < collection.colors.length; i++) {
    colorsHtml += `<p class="color" style="background-color: ${collection.colors[i].hex.value};"></p>`
    colorNamesHtml += `<p class="color-names">${collection.colors[i].name.value}</p>`
    hexValuesHtml += `<p class="hex-value">${collection.colors[i].hex.value}</p>`
  }
  colorsEl.innerHTML = colorsHtml;
  colorNamesEl.innerHTML = colorNamesHtml;
  hexValuesEl.innerHTML = hexValuesHtml;
}

function changeColors() {
  const colorGeneratorEl = document.querySelector('.color-generator');
  const getAllPs = Array.from(document.querySelectorAll('.intro p, .accent-text, .sidenotes'));

  if (newBkgColor === '#ffffff') {
    getAllPs.map( (item) => {item.style.color = '#000000'});
    colorGeneratorEl.style.border = '1px solid lightgray';
  } else {
    getAllPs.map( (item) => {item.style.color = '#ffffff'});
    colorGeneratorEl.style.border = 'none';
  }
  document.querySelector('.section-container').style.backgroundColor = newBkgColor;
  document.querySelector('.sidenotes').style.backgroundColor = newBkgColor;
  document.querySelector('.main-heading').style.color = colorValue;
  document.querySelector('.intro-footer a').style.color = colorValue;
}

renderOptions();
fetchData();