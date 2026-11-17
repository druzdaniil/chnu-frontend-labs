const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

async function run() {
    const rl = readline.createInterface({ input, output});

    console.log('> Перевірка наявності слова в тексті (нерегістрозалежна): ');
    console.log('! Майте на увазі, всі спец. символи будуть проігноровані');

    try {
        const text = await rl.question('\nВведіть текст: ');
        const word = await rl.question('\nВведіть слово для пошуку: ');
        
        const textNormalized = normalizeText(text);
        const wordNormalized = normalizeText(word);
        
        if (!textNormalized.trim()) {
            throw new Error('Текст повинен мати принаймні один символ');
        }

        if (!wordNormalized.trim()) {
            throw new Error('Слово повинно мати принаймні один символ');
        }
        
        if(!isWordValid(wordNormalized)) {
            throw new Error('Між символами не може бути пробілів');
        }

        analyzeText(wordNormalized, textNormalized);
    } finally {
        rl.close();
    }
}

function isWordValid(word) {
    return !word.trim().includes(' ');
}

function normalizeText(text) {
    return text
        .replace(/[`\u2019\u2018\u02BC]/g, "'")
        .replace(/(?!['-])[\p{P}\p{S}]/gu, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function analyzeText(word, text) {
    const words = text.split(' ');

    const textWordsCount = words.length;
    const wordCount = calcWordCount(word, words);

    const wordIndexes = getWordIndexes(word, words);

    const wordPercentageString = calcWordPercentage(wordCount, textWordsCount);

    const wordsCountStats = getWordsCountStats(words);

    console.log(`\nСумарно слів у тексті: ${textWordsCount}`);
    console.log(`\nСлово "${word}" зустрілося у тексті ${wordCount} разів`);
    console.log(`\nСлово "${word}" було знайдено на індексах: `, wordIndexes);
    console.log(`\nЧастка "${word}" від інших слів у тексті: ${wordPercentageString}`);
    console.log(`\nЗагальна статистика по кожному слову: `, wordsCountStats);
}

function calcWordCount(wordToFind, words) {
    return words.reduce((count, currentWord) => {
        return count + (currentWord === wordToFind ? 1 : 0);
    }, 0);
}

function getWordIndexes(wordToFind, words) {
    const wordIndexes = [];
    words.forEach((currentWord, currentIndex) => {
        if (currentWord === wordToFind) {
            wordIndexes.push(currentIndex);
        }
    });
    return wordIndexes;
}

function calcWordPercentage(wordCount, totalWordsCount) {
    const percentage = wordCount * 100 / totalWordsCount;
    const percentageString = percentage.toFixed(5);
    return Number(percentageString) + '%';
}

function getWordsCountStats(words) {
    return words.reduce((wordsCount, currentWord) => {
        wordsCount[currentWord] = (wordsCount[currentWord] || 0) + 1;
        return wordsCount;
    }, Object.create(null));
}

run();