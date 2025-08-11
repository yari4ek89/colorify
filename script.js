const boxPreview = document.querySelector('.box-preview');
const chooseColor = document.querySelector('#choose-color');
const rgbField = document.querySelector('#rgb-code');
const hexField = document.querySelector('#hex-code');
const rgbCopy = document.querySelector('#rgb-copy');
const hexCopy = document.querySelector('#hex-copy');
const body = document.querySelector('body');
const lastColContainer = document.querySelector('.last-colors');

let lastColors = JSON.parse(localStorage.getItem('lastColors')) || [];

chooseColor.addEventListener('input', () => chooseColorFunction(chooseColor.value));
rgbCopy.addEventListener('click', () => copyValue(rgbCopy, rgbField.value));
hexCopy.addEventListener('click', () => copyValue(hexCopy, hexField.value));
rgbField.addEventListener('click', () => copyValue(rgbCopy, rgbField.value));
hexField.addEventListener('click', () => copyValue(hexCopy, hexField.value));

function chooseColorFunction(value) {
    boxPreview.style.backgroundColor = value;
    rgbField.value = hexToRgb(value);
    hexField.value = value;
    body.style.backgroundColor = value;
    if (!lastColors.includes(value)) {
        lastColors.push(value);
        if (lastColors.length > 10) lastColors.shift();
    }
    chooseColor.value = value; // if picked color via button
    saveColors();
    renderColors();
}

function copyValue(button, value) {
    navigator.clipboard.writeText(value);
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = 'Copy';
    }, 2000);
}

function hexToRgb(hex) {
    let cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

    if (cleanHex.length === 3) {
        cleanHex = cleanHex.split('').map(char => char + char).join('');
    }

    const rgbArray = [];
    rgbArray[0] = parseInt(cleanHex.substring(0, 2), 16);
    rgbArray[1] = parseInt(cleanHex.substring(2, 4), 16);
    rgbArray[2] = parseInt(cleanHex.substring(4, 6), 16);

    return `${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}`;
}

// ============================== LAST COLORS =================================
function renderColors() {
    lastColContainer.innerHTML = '';

    lastColors.forEach(color => {
        const colEl = document.createElement('div');
        colEl.classList.add('lastCol');

        const colorButton = document.createElement('button');
        colorButton.style.backgroundColor = color;
        colorButton.classList.add('last-button');
        colorButton.addEventListener('click', () => chooseColorFunction(color));

        colEl.appendChild(colorButton);

        lastColContainer.appendChild(colEl);
    });
}

function saveColors() {
    localStorage.setItem('lastColors', JSON.stringify(lastColors));
}

renderColors();