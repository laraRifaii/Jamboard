'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const boxes = Array.from(document.getElementsByClassName('btn'));
const arrleft = document.querySelector('.arrow-left');
const arrright = document.querySelector('.arrow-right');
const number = document.querySelector('.numbers');
const pen = document.querySelector('.pen');
const canvasListUtility = document.getElementsByClassName(
  'canvas-list-utilities'
);
const allBtns = document.querySelectorAll('li');
const eraser = document.querySelector('.eraser');
const select = document.querySelector('.select');
const note = document.querySelector('.note');
const image = document.querySelector('.image');
const circle = document.querySelector('.circle');
const text = document.querySelector('.text');
const laser = document.querySelector('.laser');
const Colorbtn = document.querySelectorAll('.color-btn');
const penStyles = document.querySelectorAll('.pen-styles');
const styleBtn = document.querySelectorAll('.style-btn');
const colorPalette = document.querySelector('.color-palette');
const jamTitle = document.querySelector('.name');
const modal = document.querySelector('.modal');
const btnCancel = document.getElementById('cancel');
const submit = document.querySelector('.btn--save');

let drawing = false;
let currentColor = 'black';
let penstyle = 'default';

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Convert mouse coordinates to canvas coordinates accounting for CSS scaling and page offset
function getCanvasCoordinates(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

Colorbtn.forEach(button => {
  button.addEventListener('click', () => {
    currentColor = button.getAttribute('data-color');
  });
});

// canvas.addEventListener('mousedown', () => drawing = true);
// canvas.addEventListener('mouseup', () => drawing = false);
// canvas.addEventListener('mousemove', draw);

function draw(event) {
  if (!drawing) return;

  // ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;

  const { x, y } = getCanvasCoordinates(event);
  ctx.lineTo(x, y);

  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}
// Event listeners for canvas
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(event) {
  drawing = true;
  ctx.beginPath();
  const { x, y } = getCanvasCoordinates(event);
  ctx.moveTo(x, y);
  draw(event); // Start drawing immediately at the cursor position
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath(); // Reset the path to avoid drawing a line from the last point
}
// Open Palette
function openPalette() {
  colorPalette.classList.remove('hidden');
}
// pen.addEventListener("dblclick", openPalette);
// Close Palette
function closePalette() {
  colorPalette.classList.add('hidden');
}
pen.addEventListener('click', closePalette);

penStyles.forEach(pen =>
  pen.addEventListener('click', function drawOnCanvas(x, y) {
    switch (penstyle) {
      case 'marker':
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'butt';
        break;
      case 'highlighter':
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 6;
        break;
      case 'brush':
        ctx.globalAlpha = 0.06;
        ctx.lineWidth = 10;
        break;
      default:
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = 1;
        break;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 1, y + 1); // Small line to simulate a dot
    ctx.stroke();
  })
);

function setPen(style) {
  penstyle = style;
}
function applyBackground(clickedButton) {
  allBtns.forEach(btn => {
    btn.style.backgroundColor = '';
  });
  clickedButton.style.backgroundColor = 'rgb(60,64,67)';
}

const penbtns = document.querySelector('.style-btn');

function applyBackgroundPen(clickedButton) {
  penbtns.forEach(btn => {
    btn.style.backgroundColor = '';
  });
  clickedButton.style.backgroundColor = ' black';
}

function applyBoxShadow(clickedButton) {
  // Remove box shadow from all buttons
  Colorbtn.forEach(btn => {
    btn.style.boxShadow = '';
  });
  // Apply box shadow to the clicked button
  clickedButton.style.boxShadow = '1px 5px 8px rgb(151, 152, 153)';
}

const openForm = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  document.body.classList.add('show-background');
};
const closeForm = () => {
  modal.classList.add('hidden');
  document.body.classList.remove('show-background');
};

const cancelInput = () => {
  jamTitle.textContent = 'Untitled Jam';
  closeForm();
};

function render_title(e) {
  e.preventDefault();
  const title = document.getElementById('text-jam').value;
  if (title === '') {
    jamTitle.textContent = jamTitle.textContent;
    closeForm();
  } else {
    let html = `${title}`;
    jamTitle.textContent = html;
    closeForm();
  }
}
jamTitle.addEventListener('click', openForm);

submit.addEventListener('click', render_title);

cancel.addEventListener('click', cancelInput);

let n = 1;
// let currentSlide = 0;

// function showSlide(index) {
//     const slides = document.querySelectorAll('.slide');
//     const totalSlides = slides.length;

//     if (index >= totalSlides) {
//         currentSlide = 0;
//     } else if (index < 0) {
//         currentSlide = totalSlides - 1;
//     } else {
//         currentSlide = index;
//     }

//     const offset = -currentSlide * 45;
//     document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
// }

// function changeSlide(direction) {
//     showSlide(currentSlide + direction);

//     n++;
//     number.textContent =  `${n}`+" / " + ` ${n}`;
//     arrleft.style.opacity='1';
// }

// // Initialize the slider
// showSlide(currentSlide);
