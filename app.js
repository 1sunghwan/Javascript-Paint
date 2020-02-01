const canvas = document.getElementById('jsCanvas');
const colors = document.getElementById('jsColors');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');
const blackBg = document.getElementById('blackBackground');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const pTitle = document.getElementById('paintTitle');
let ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = '#2c2c2c';
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    let color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleSizeChange(event) {
    let size = event.target.value;
    ctx.lineWidth = size;
}

function handleColorFill() {
    if (filling) {
        filling = false;
        mode.innerText = '채우기';
    } else {
        filling = true;
        mode.innerText = '그리기';
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveClick() {
    blackBg.style.display = 'block';
}

function yesBtnClick() {
    let image = canvas.toDataURL();
    let a = document.createElement('a');
    a.href = image;
    a.download = pTitle.value !== '' ? pTitle.value : '제목없음';
    a.click();
    pTitle.value = "";
    blackBg.style.display = 'none';
}

function noBtnClick() {
    blackBg.style.display = 'none';
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleContextMenu);
}

// Array.from(colors).forEach(color => {
//     color.addEventListener('click', handleColorClick);
// });
if (colors) {
    colors.addEventListener('click', handleColorClick);
}

if (range) {
    range.addEventListener('input', handleSizeChange);
}

if (mode) {
    mode.addEventListener('click', handleColorFill);
}
if (save) {
    save.addEventListener('click', handleSaveClick);
}