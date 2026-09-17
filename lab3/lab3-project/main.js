const canvas = document.getElementById('canvas');
const [forLoopBtn, whileBtn, doWhileBtn] = document.querySelectorAll('.build-btns__item');
const clearBtn = document.querySelector('.clear-btn');

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

function setGraphStart() {
    ctx.beginPath();
        
    const START_X = -1;
    const END_X = 1;
    const STEP = 0.1;
    const startY = getFucntionValue(START_X);

    const screenX = screenXCalc(START_X);
    const screenY = screenYCalc(startY);
    ctx.moveTo(screenX, screenY);

    return [START_X, END_X, STEP];
}

forLoopBtn.addEventListener('click', () => {
    const [start, end, step] = setGraphStart();
    ctx.strokeStyle = 'white';
    
    for (let x = start + step; x <= end + 0.01; x += step) {
        const currentY = getFucntionValue(x);
        
        const screenX = screenXCalc(x);
        const screenY = screenYCalc(currentY);
        ctx.lineTo(screenX, screenY);
    }
    
    ctx.stroke();
})

whileBtn.addEventListener('click', () => {
    const [start, end, step] = setGraphStart();
    ctx.strokeStyle = 'rgb(171, 235, 247)';

    let x = start + step;

    while (x <= end + 0.01) {
        const currentY = getFucntionValue(x);

        const screenX = screenXCalc(x);
        const screenY = screenYCalc(currentY);
        ctx.lineTo(screenX, screenY);

        x += step;
    }

    ctx.stroke();
})

doWhileBtn.addEventListener('click', () => {
    const [start, end, step] = setGraphStart();
    ctx.strokeStyle = 'rgb(247, 242, 171)';

    let x = start + step;

    do {
        const currentY = getFucntionValue(x);

        const screenX = screenXCalc(x);
        const screenY = screenYCalc(currentY);
        ctx.lineTo(screenX, screenY);

        x += step;
    } while (x <= end + 0.01);

    ctx.stroke();
})

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
})

drawAxes();