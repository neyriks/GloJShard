'use strict';

function random(name) {
  if(typeof name !== 'string') {  // Работает как надо, вместое MadMax ставим цифры - срабатывает алерт.
    alert('Не строка');
  }
  console.log(name.trim());
  console.log(name.length > 30 ? name.slice(0, 30) + '...' : name);  // Работает так, как надо.
}
random(prompt(''));   // Пробелы на проверку trim.