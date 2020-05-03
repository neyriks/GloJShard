'use strict';
let week = [
    'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 
];

let weeks = document.getElementById('weeks');
let toDay = new Date().getDay();
console.log(weeks);
console.log(toDay);
 for (let i = 0; i < week.length; i++) {
   let newList = document.createElement('p');
   if (i === toDay) {
     if (week[i] === 'суббота' || week[i] === 'воскресенье') {
      newList.innerHTML = (`<p><b><i>${week[i]}</i></b></p>`);
     } else {
      newList.innerHTML = (`<p><b>${week[i]}</b></p>`);
     }
   } else if (week[i] === 'суббота' || week[i] === 'воскресенье') {
    newList.innerHTML = (`<p><i>${week[i]}</i></p>`);
   } else {
    newList.innerHTML = (`<p>${week[i]}</p>`);
   }
   weeks.appendChild(newList);
 }
 console.log(week);