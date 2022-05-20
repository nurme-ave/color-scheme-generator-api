import { colorsEl, hexValuesEl } from './render-content.js';

colorsEl.addEventListener('click', getValueRGB);
hexValuesEl.addEventListener('click', getValueHEX);

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
  const notificationText = document.getElementById('notification-text');
  notificationText.classList.add('copied');
  setTimeout(() => {
    notificationText.classList.remove('copied');
  }, 1000);
}