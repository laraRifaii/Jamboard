"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const boxes = Array.from(document.getElementsByClassName("btn"));
const pen = document.querySelector(".pen");
const canvasListUtility = document.getElementsByClassName(
  "canvas-list-utilities"
);
const eraser = document.querySelector(".eraser");
const select = document.querySelector(".select");
const note = document.querySelector(".note");
const image = document.querySelector(".image");
const circle = document.querySelector(".circle");
const text = document.querySelector(".text");
const laser = document.querySelector(".laser");
const Colorbtn = document.querySelectorAll(".color-btn");
const penStyles = document.querySelectorAll(".pen-styles");
const styleBtn=document.querySelectorAll(".style-btn")
const colorPalette = document.querySelector(".color-palette");
let drawing = false;
let currentColor = "black";
let penstyle = "default";

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

Colorbtn.forEach((button) => {
  button.addEventListener("click", () => {
    currentColor = button.getAttribute("data-color");
  });
});

// canvas.addEventListener('mousedown', () => drawing = true);
// canvas.addEventListener('mouseup', () => drawing = false);
// canvas.addEventListener('mousemove', draw);

function draw(event) {
  if (!drawing) return;

  // ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;
  
  ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);

  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}
// Event listeners for canvas
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

function startDrawing(event) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop );
  draw(event); // Start drawing immediately at the cursor position
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath(); // Reset the path to avoid drawing a line from the last point
}

function applyBoxShadow(clickedButton) {
  // Remove box shadow from all buttons
   Colorbtn.forEach((button) => {
      button.style.boxShadow = "";
  });
  // Apply box shadow to the clicked button
  clickedButton.style.boxShadow = "1px 5px 8px rgb(151, 152, 153)";
}
// Open Palette
function openPalette() {
  colorPalette.classList.remove("hidden");
}
pen.addEventListener("dblclick", openPalette);
// Close Palette
function closePalette() {
  colorPalette.classList.add("hidden");
}
pen.addEventListener("click", closePalette);

//Responsive design

window.addEventListener("resize", adjustCanvasSize);

function adjustCanvasSize() {
  const container = document.querySelector(".canvas");
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width < 600) {
    container.style.width = "85%";
    container.style.height = "42%";
    container.style.marginTop = "23%";
    container.style.marginLeft = "-30px";
  } else if (width < 768) {
    container.style.width = "85%";
    container.style.height = "55%";
    container.style.marginTop = "10%";
    container.style.marginLeft = "-30px";
    container.style.marginBottom = "30%";
  } else if (width < 992) {
    container.style.width = "93%";
    container.style.height = "74%";
    container.style.marginTop = "2.5%";
    container.style.marginLeft = "-35px";
    container.style.marginBottom = "30%";
    container.style.marginRight = "5%";
  } else {
    container.style.width = "60%";
    container.style.height = "74%";
    container.style.marginLeft = "15%";
    container.style.marginRight = "17%";
    container.style.marginBottom = "5%";
    container.style.marginTop = "1%";
  }
}

// Initial adjustment
adjustCanvasSize();

penStyles.forEach((pen) =>
  pen.addEventListener("click", function drawOnCanvas(x, y) {
    switch (penstyle) {
        case 'marker':
            ctx.globalAlpha = 1.0;
            ctx.lineWidth = 2;
            ctx.strokeStyle='butt';
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
}
));

function setPen(style) {
  penstyle = style;
}