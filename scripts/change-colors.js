import { newBkgColor } from './fetch-data.js';
import { colorValue } from './index.js';

/*
  Change the colors on the page and make
  some styling changes on the page 
  according to the user input, otherwise
  the website might get way too colorful
  and noisy :)
*/
function changeColors() {
  const colorGeneratorEl = document.getElementById('color-generator');
  const getAllClasses = document.querySelectorAll('.accent-text, .intro p, .sidenotes');

  if (newBkgColor === '#ffffff') {
    getAllClasses.forEach( (item) => {item.style.color = '#000000'});
    colorGeneratorEl.style.border = '1px solid lightgray';
  } else {
    getAllClasses.forEach( (item) => {item.style.color = '#ffffff'});
    colorGeneratorEl.style.border = 'none';
  }
  document.querySelectorAll('.section-container, .sidenotes').forEach( (item) => item.style.backgroundColor = newBkgColor);
  document.querySelectorAll('.main-heading, .intro-footer a').forEach( (item) => item.style.color = colorValue);
}

export { changeColors };