'use strict';
let arr = [
    '233','241','395','446','922','513','421'
];
arr.forEach(e => {
    if(e[0] === '2' || e[0] === '4') {   // Можно было черех startWith
        console.log(e);
    }
});

// Простые числа.
foo: // Метка
for (let i = 2; i < 100; i++) {
    for(let j = 2; j < i; j++) {
        if(i % j === 0){
            continue foo; 
        }
    }
    console.log(i + ' - Делители этого числа: 1 и n = ' + i);
}
