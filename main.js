'use strict';

let array = ['227', '258', '411', '443', '559', '661', '260'];
array.forEach((number) => {                                   // Использовал стрелочную функцию.
    if (number.startsWith('2') || number.startsWith('4')) {   // Указываем с какой цифры стартуем. (отвечаем startsWith)
      console.log(number);                                    // Выводим цифры в консоль.
    }
  });