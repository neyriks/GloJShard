'use strict';

function random(name) {
  if(typeof name !== 'string') {
    alert('Не строка');
  }
  console.log(name.trim());
  return name.length > 30 ? name.slice(0, 30) + '...' : name;
}
random('MadMax');