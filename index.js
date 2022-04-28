
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
const hexValuesEl = document.getElementById('hex-values');

colorsEl.addEventListener('click', getValueRGB);
hexValuesEl.addEventListener('click', getValueHEX);

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
  no user data (values) then by default these parameters will be used.
  After fetching the data I pass it into the renderContent() as an argument.
*/
async function fetchData(colorValue='#0000ff', mode='monochrome', format='json', count=5) {
  const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue.slice(1)}&format=${format}&mode=${mode}&count=${count}`)
  const data = await response.json()
  renderContent(data);
}

// Render the colors and HEX values onto the page
function renderContent(collection) {
  let colorsHtml = '';
  let hexValuesHtml = '';
  for (let i = 0; i < collection.colors.length; i++) {
    colorsHtml += `<p class="color" style="background-color: ${collection.colors[i].hex.value};"></p>`
    hexValuesHtml += `<p class="hex-value">${collection.colors[i].hex.value}</p>`
  }
  colorsEl.innerHTML = colorsHtml;
  hexValuesEl.innerHTML = hexValuesHtml;
}

// Get the RGB value when the color is clicked
function getValueRGB(e) {
  if (e.target.tagName === 'P') {
    const target = e.target.style.backgroundColor;
    copyToClipboard(target);
  }
}

// Get the HEX code when the color code is clicked
function getValueHEX(e) {
  if (e.target.tagName === 'P') {
    const target = e.target.textContent;
    copyToClipboard(target);
  }
}

// Copy the value to the clipboard
function copyToClipboard(targetValue) {
  const textToCopy = targetValue;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      notifyUser();
    })
    .catch((err) => {
      alert(err);
  });
}

// Notify the user that the data has been copied
function notifyUser() {
  const notificationText = document.querySelector('.notification-text');
  notificationText.classList.add('copied');
  setTimeout(() => {
    notificationText.classList.remove('copied');
  }, 1000);
}

renderOptions();
fetchData();