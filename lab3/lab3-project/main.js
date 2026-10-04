const canvas = document.getElementById('canvas');
const [forLoopBtn, whileBtn, doWhileBtn] = document.querySelectorAll('.build-btns__item');
const clearBtn = document.querySelector('.clear-btn');
const tableBody = document.getElementById('valuesTableBody');

const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const scale = 200;

function drawAxes() {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    ctx.lineWidth = 3;
}

function getFucntionValue(x) {
    return Math.E ** (0.2 * (x ** 2));
}

function screenXCalc(x) {
    return centerX + (x * scale);
}

function screenYCalc(y) {
    return centerY - (y * scale);
}

function getUserInputs() {
    const intervalStart = Number(prompt('Введіть початок інтервалу: ', '-1'));
    const intervalEnd = Number(prompt('Введіть кінець інтервалу: ', '1'));
    const step = Number(prompt('Введіть крок:', '0.1'));

    return [intervalStart, intervalEnd, step];
}

function addTableRow(x, y) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${x.toFixed(2)}</td><td>${y.toFixed(4)}</td>`;
    tableBody.appendChild(row);
}

function setGraphStart(startX, endX, step) {
    ctx.beginPath();

    tableBody.innerHTML = '';
        
    const startY = getFucntionValue(startX);

    const screenX = screenXCalc(startX);
    const screenY = screenYCalc(startY);
    ctx.moveTo(screenX, screenY);

    return [startX, endX, step];
}

forLoopBtn.addEventListener('click', () => {
    const [userStart, userEnd, userStep] = getUserInputs();
    const [start, end, step] = setGraphStart(userStart, userEnd, userStep);
    ctx.strokeStyle = 'white';
    
    for (let x = start + step; x <= end + 0.01; x += step) {
        const currentY = getFucntionValue(x);
        
        const screenX = screenXCalc(x);
        const screenY = screenYCalc(currentY);
        ctx.lineTo(screenX, screenY);

        addTableRow(x, currentY);
    }
    
    ctx.stroke();
})

whileBtn.addEventListener('click', () => {
    const [userStart, userEnd, userStep] = getUserInputs();
    const [start, end, step] = setGraphStart(userStart, userEnd, userStep);
    ctx.strokeStyle = 'rgb(171, 235, 247)';

    let x = start + step;

    while (x <= end + 0.01) {
        const currentY = getFucntionValue(x);

        const screenX = screenXCalc(x);
        const screenY = screenYCalc(currentY);
        ctx.lineTo(screenX, screenY);

        addTableRow(x, currentY);

        x += step;
    }

    ctx.stroke();
})

doWhileBtn.addEventListener('click', () => {
    const [userStart, userEnd, userStep] = getUserInputs();
    const [start, end, step] = setGraphStart(userStart, userEnd, userStep);
    ctx.strokeStyle = 'rgb(247, 242, 171)';

    let x = start + step;

    do {
        const currentY = getFucntionValue(x);

        const screenX = screenXCalc(x);
        const screenY = screenYCalc(currentY);
        ctx.lineTo(screenX, screenY);

        addTableRow(x, currentY);

        x += step;
    } while (x <= end + 0.01);

    ctx.stroke();
})

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    tableBody.innerHTML = '';
})

drawAxes();