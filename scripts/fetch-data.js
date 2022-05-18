import { colorsEl, renderContent } from './render-content.js';

let newBkgColor;

/*
  Fetch data from the Color API. I'm using default parameters here so if there's
  no user data (values) then by default these parameters will be used.
  After fetching the data I pass it into the renderContent() as an argument.
*/
async function fetchData(colorValue='#020024', mode='monochrome', format='json', count=5) {
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

export { fetchData, newBkgColor };