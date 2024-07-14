"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const boxes = Array.from(document.getElementsByClassName("btn"));
const pen = document.querySelector(".pen");

const eraser = document.querySelector(".eraser");
const select = document.querySelector(".select");
const note = document.querySelector(".note");
const image = document.querySelector(".image");
const circle = document.querySelector(".circle");
const text = document.querySelector(".text");
const laser = document.querySelector(".laser");
const btn = document.querySelectorAll(".color-btn");
const colorPalette = document.querySelector(".color-palette");
let drawing = false;
let currentColor = "black";

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

btn.forEach((button) => {
  button.addEventListener("click", () => {
    currentColor = button.getAttribute("data-color");
  });
});

// canvas.addEventListener('mousedown', () => drawing = true);
// canvas.addEventListener('mouseup', () => drawing = false);
// canvas.addEventListener('mousemove', draw);

function draw(event) {
  if (!drawing) return;

  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;

  ctx.lineTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
}
// Event listeners for canvas
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

function startDrawing(event) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  draw(event); // Start drawing immediately at the cursor position
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath(); // Reset the path to avoid drawing a line from the last point
}

function applyBoxShadow(clickedButton) {
  // Remove box shadow from all buttons

  btn.forEach((button) => {
    button.style.boxShadow = "";
  });

  // Apply box shadow to the clicked button
  clickedButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
}
function openPalette() {
  colorPalette.classList.remove("hidden");
}
pen.addEventListener("dblclick", openPalette);

function closePalette() {
  colorPalette.classList.add("hidden");
}
pen.addEventListener('click',closePalette);
