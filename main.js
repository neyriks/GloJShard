'use strict';
let date = new Date().toLocaleString('ru');
console.log(date);
let newTime = document.createElement('p');
let dayarray = new Array("воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"),
    montharray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"),
    ndata = new Date(),
    day = dayarray[ndata.getDay()],
    month = montharray[ndata.getMonth()];
date = ndata.getDate();
let year = ndata.getFullYear(),
    hours = ndata.getHours(),
    mins = ndata.getMinutes(),
    secs = ndata.getSeconds();
if (hours < 10) {
    hours = "0" + hours;
}
if (mins < 10) {
    mins = "0" + mins;
}
if (secs < 10) {
    secs = "0" + secs;
}
if (date < 10) {
    date = "0" + date;
}
function declOfNum(number, titles) {  
    const cases = [2, 0, 1, 1, 1, 2];  
     return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}
let datastr = (`Сегодня ${day}, ${date} ${month} ${year} года, ${hours} ${declOfNum(hours, ['час', 'часа', 'часов'])} ${mins} минут ${secs} секунд`);
console.log(datastr);

// Вывод кажду секунду.

    setInterval(() => {
    let date = new Date();
        let newDate = (`${(date.getDate())} ${month} ${date.getFullYear()} - ${(date.getHours())}:${(date.getMinutes())}:${(date.getSeconds())}`);
        let block = document.querySelector('.block');
        newTime.textContent = newDate;
        block.appendChild(newTime);
    }, 1000);
