const [btn1, btn2, btn3] = ['btn-1', 'btn-2', 'btn-3']
    .map(id => document.getElementById(id));

let x = 1;
const y = 3;
let z = 3;

function calcExpression1() {
    alert(`Результат обчислення №1: ${x += y - x++ * z}`);
}

function calcExpression2() {
    confirm(`Результат обчислення №2: ${z = x++ + y * 5} \nПідтверджуєте результат?`);
}

function calcExpression3() {
    confirm(`Результат обчислення №3: ${x = y - x++ * z} \nПідтверджуєте результат?`);
}

btn2.addEventListener('mouseover', calcExpression2);
btn3.addEventListener('mouseout', calcExpression3);

alert('Варіант: 01\nПІБ: Друзь Даніїл Сергійович');

