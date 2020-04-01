'use strict';

function random(name) {
  if(typeof name !== 'string') {  // Работает как надо, вместое MadMax ставим цифры - срабатывает алерт.
    alert('Не строка');
  }
  console.log(name.trim());
  console.log(name.length > 30 ? name.slice(0, 30) + '...' : name);  // Работает так, как надо.
}

random('Madmax');
random(123);  


// let array = ['227', '258', '411', '443', '559', '661', '260'];
// array.forEach((number) => {                                   // Использовал стрелочную функцию.
//     if (number.startsWith('2') || number.startsWith('4')) {   // Указываем с какой цифры стартуем. (отвечаем startsWith)
//       console.log(number);                                    // Выводим цифры в консоль.
//     }
//   });
