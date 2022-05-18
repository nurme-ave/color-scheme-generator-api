import { colorValue } from "./index.js";
import { changeColors } from "./change-colors.js";

const colorsEl = document.getElementById('colors');
const colorNamesEl = document.getElementById('color-names');
const hexValuesEl = document.getElementById('hex-values');

/*
  First detect if we have input from the user,
  if yes - launch changeColors() to change the
  color scheme on the page according to the 
  user input.
  Render the colors, color names and 
  HEX values onto the page.
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

export { renderContent, colorsEl, hexValuesEl };