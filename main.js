// задача 2 - усложенная
'use strict';

// let num = 266219,
//     newNum = num.toString().split(''),
//     result = newNum.reduce(function(mult, current) {
//     return mult * current;
//   });
// console.log(result);

// let numRoot = result ** 3;
// console.log(String(numRoot).slice(0,2));


// // Задача календарь (ЗАДАЧА 3 УСЛОЖНЕННАЯ) switch

// // let lang = prompt('Введите язык: ru или en');
// // switch (lang) {
// // 	case 'ru':
// // 		arr = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
// // 	break;
// // 	case 'en':
// // 		arr = ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'];
// //   break;
// //   default:
// //     console.log('something wrong');
// // }
// // console.log(arr);

// // Через if
// // let lang = prompt('Введите язык: ru или en');
// // if (lang === 'ru') {
// //   arr = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
// // } else if (lang === 'en') {
// //   arr = ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'];
// // } else {
// //   console.log('wrong language');
// // } 
// // console.log(arr);

// // Многомерный массив.
// let lang = prompt('Введите язык: ru или en');
// let array = {
// 	'ru':['пн', 'вт', 'ср','чт', 'пт', 'сб', 'вс'],
// 	'en':['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'],
// };
// console.log(array[lang]);

// // Задача с namePerson (ЗАДАЧА 3 УСЛОЖНЕННАЯ)

// let n = prompt('Введите имя');
// let namePerson = n === 'Артем' ? 'Директор' : n === 'Артём' ? 'Директор' : n === 'Максим' ? 'Препод' : 'Студент';
// console.log(namePerson);


function random() {
  let name = prompt('');
  if(typeof name !== 'string') {
    alert('Не строка');
  }
  alert(name.trim());
  return name.length > 30 ? name.slice(0, 30) + '...' : name;
}
random();