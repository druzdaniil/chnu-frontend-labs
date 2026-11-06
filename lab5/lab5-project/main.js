const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

async function run() {
    const rl = readline.createInterface({ input, output });

    try {
        const arrLengthValue = await rl.question('Введіть кількість елементів масиву: ');
        const arrLength = Number(arrLengthValue.trim());
        
        if (!isValidArrayLength(arrLength)) {
            throw new Error ('Довжина масиву вказана невірно');
        }

        const minValue = await rl.question('Введіть мінімальне значення для цілочисельного масиву: ');
        const min = Number(minValue.trim());

        if (!isValidNumber(min)) {
            throw new Error('Введено некоректне мінімальне число');
        }

        const maxValue = await rl.question('Введіть максимальне значення для цілочисельного масиву: ');
        const max = Number(maxValue.trim());

        if (!isValidNumber(max)) {
            throw new Error('Введено некоректне максимальне число');
        }

        if (!isValidRange(min, max)) {
            throw new Error('Діапазон значень задан неправильно');
        }

        const generatedArray = generateArray(arrLength, min, max);
        printArray(generatedArray);

        const elementToCheck = await rl.question('\nВведіть елемент, наявність якого в масиві Ви хочете перевірити: ');
        const elementValue = Number(elementToCheck.trim());
        
        if(!isValidNumber(elementValue)) {
            throw new Error('Введено некоректний елемент');
        }

        isElementInArray(generatedArray, elementValue);
        getElementPositionInfo(generatedArray, elementValue);
    } finally {
        rl.close();
    }
}

function isValidNumber(value) {
    return Number.isFinite(value);
}

function isValidArrayLength(arrLength) {
    const isLengthNumberValid = isValidNumber(arrLength);
    return arrLength > 0 && Number.isSafeInteger(arrLength) && isLengthNumberValid;
}

function isValidRange(min, max) {
    return Math.round(min) <= Math.floor(max);
}

function getRandomInteger(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function generateArray(arrLength, min, max) {
    const argArr = Array.from(arguments);

    const minValue = Math.round(argArr[1]);
    const maxValue = Math.floor(argArr[2]);

    return new Array(argArr[0])
        .fill(0)
        .map(el => getRandomInteger(minValue, maxValue));
}

function printArray(array) {
    console.log('\nСтворений масив: ', array);
}

function isElementFound(index) {
    return index !== -1;
}

function isElementInArray(array, elementValue) {
    const isElementInArrayByIncludes = array.includes(elementValue);
    const isElementInArrayBySome = array.some(el => el === elementValue);
    const isElementInArrayByIndexOf = array.indexOf(elementValue) !== -1;

    console.log(`\nПеревірка наявності елемента "${elementValue}" через includes: ${isElementInArrayByIncludes}`);
    console.log(`Перевірка наявності елемента "${elementValue}" через some: ${isElementInArrayBySome}`);
    console.log(`Перевірка наявності елемента "${elementValue}" через indexOf: ${isElementInArrayByIndexOf}`);
}

function getElementPositionInfo(array, elementValue) {
    const firstIndex = array.indexOf(elementValue);
    const firstFoundIndex = isElementFound(firstIndex) 
        ? firstIndex
        : 'даного елементу в масиві немає';

    const lastIndex = array.lastIndexOf(elementValue) ;
    const lastFoundIndex = isElementFound(lastIndex) 
        ? lastIndex
        : 'даного елементу в масиві немає';

    const foundIndexesCount = array.filter(el => el === elementValue).length;
    const foundIndexes = array.map((el, i) => i).filter(i => array[i] === elementValue);

    console.log(`\nІндекс першого знайденого елементу "${elementValue}": ${firstFoundIndex}`);
    console.log(`Індекс останнього знайденого елементу "${elementValue}": ${lastFoundIndex}`);
    console.log(`Сумарна кількість знайденних елементів "${elementValue}": ${foundIndexesCount}`);
    console.log(`Індекси знайденних елементів "${elementValue}": ${foundIndexes}`);
}

run();