// задача 2 - усложенная
let num = 266219,
    newNum = num.toString().split(''),
    result = newNum.reduce(function(mult, current) {
    return mult * current;
  });
console.log(result);

numRoot = result ** 3;
console.log(String(numRoot).slice(0,2));


// Задача календарь (ЗАДАЧА 3 УСЛОЖНЕННАЯ)

let lang = prompt('Введите язык: ru или en');
switch (lang) {
	case 'ru':
		arr = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
	break;
	case 'en':
		arr = ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'];
  break;
  default:
    console.log('something wrong');
}
console.log(arr);

// Задача с namePerson (ЗАДАЧА 3 УСЛОЖНЕННАЯ)

let n = prompt('Введите имя');
let namePerson = n === 'Артем' ? 'Директор' : n === 'Артём' ? 'Директор' : n === 'Максим' ? 'Препод' : 'Студент';
console.log(namePerson);