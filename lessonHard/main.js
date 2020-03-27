let num = 266219,
    newNum = num.toString().split(''),
    result = newNum.reduce(function(mult, current) {
    return mult * current;
  });
console.log(result);

numRoot = result ** 3;
console.log(String(numRoot).slice(0,2));