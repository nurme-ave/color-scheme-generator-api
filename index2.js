
const choicesArr = [
'monochrome',
'monochrome-dark',
'monochrome-light',
'analogic',
'analogic-complement',
'triad',
'quad',
];

function initialRender() {

}

function renderChoices() {
let choicesHtml = '';
choicesHtml += choicesArr.map((choice) => {
    return `<option value="${choice}">${choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase()}</option>`
  })
  document.getElementById('choices').innerHTML = choicesHtml;
}

renderChoices();

document.querySelector('.button').addEventListener('click', () => {
const colorValue = document.getElementById('color-input').value;
const optionValue = document.getElementById('choices').value;

fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue.slice(1)}&mode=${optionValue}`)
  .then(response => response.json())
  .then(data => getColors(data))
});


function getColors(colorValues) {
let colorsCollection = [];
for (let i = 0; i < colorValues.colors.length; i++) {
  colorsCollection.push(colorValues.colors[i].hex.value);
}
renderColors(colorsCollection)
}

function renderColors(collection) {
let colorsHtml = '';
let hexHtml = '';

for (let color of collection) {
  colorsHtml += `<div class="colors" style="background-color: ${color}";></div>`
  hexHtml += `<div class="hex-values">${color}</div>`

}
document.getElementById('colors').innerHTML = colorsHtml;
document.getElementById('hex-values').innerHTML = hexHtml;
}

