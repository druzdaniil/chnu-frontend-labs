const [daysCard, hoursCard, minutesCard, secondsCard] 
    = document.querySelectorAll('.countdown-card__value');

const currentDateElement = document.querySelector('.current-date__value');
const currentTimeElement = document.querySelector('.current-time__value');

function getEndYearTimestamp(date) {
    const nextYear = date.getFullYear() + 1;
    const endYearDate = new Date(nextYear, 0, 1);
    return endYearDate.getTime();
}

function calcCountdownValues(now) {
    const endYearTimestamp = getEndYearTimestamp(now);

    const timeLeftTimestamp = endYearTimestamp - now.getTime();

    const secondsTimestamp = Math.floor(timeLeftTimestamp / 1000);
    const secondsLeft = secondsTimestamp % 60;

    const minutesTimestamp = Math.floor(secondsTimestamp / 60);
    const minutesLeft = minutesTimestamp % 60; 

    const hoursTimestamp = Math.floor(minutesTimestamp / 60);
    const hoursLeft = hoursTimestamp % 24;

    const daysLeft = Math.floor(hoursTimestamp / 24);

    return [daysLeft, hoursLeft, minutesLeft, secondsLeft];
}

function updateCountdown(date) {
    const [days, hours, minutes, seconds] = calcCountdownValues(date);
    daysCard.textContent = String(days).padStart(2, '0');
    hoursCard.textContent = String(hours).padStart(2, '0');
    minutesCard.textContent = String(minutes).padStart(2, '0');
    secondsCard.textContent = String(seconds).padStart(2, '0');
}

function updateCurrentDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const days = String(date.getDate()).padStart(2, '0');

    const weekdaysArr = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
    const weekday = weekdaysArr[date.getDay()]; 
    
    currentDateElement.textContent = `${weekday}, ${days}.${month}.${year}`;
    currentDateElement.dateTime = `${year}-${month}-${days}`;
}

function updateCurrentTime(date) {
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    currentTimeElement.dateTime = `${hours}:${minutes}:${seconds}`;
}

function renderApp() {
    const now = new Date();
    updateCountdown(now);
    updateCurrentTime(now);
    updateCurrentDate(now);
}

renderApp();

setInterval(renderApp, 1000);