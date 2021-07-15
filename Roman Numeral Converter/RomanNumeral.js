/*
Convert the given number into a roman numeral.
All roman numerals answers should be provided in upper-case.
*/

function convertToRoman(num) {
    let romanMap = [
      [ 1000, 'M' ],
      [ 900, 'CM' ],
      [ 500, 'D' ],
      [ 400, 'CD' ],
      [ 100, 'C' ],
      [ 90, 'XC' ],
      [ 50, 'L' ],
      [ 40, 'XL' ],
      [ 10, 'X' ],
      [ 9, 'IX' ],
      [ 5, 'V' ],
      [ 4, 'IV' ],
      [ 1, 'I' ]
    ];
    
    let romanN = '';
  
    function conversion(currentNum) {
    for (let i = 0; i < romanMap.length; i++) {
      if ( currentNum >= romanMap[i][0] ) {
        romanN = romanN + romanMap[i][1].repeat(Math.floor(currentNum / romanMap[i][0]));
        conversion(currentNum % romanMap[i][0]);
        break;
      }
    }};
    conversion(num);
    return romanN;
  }

  //test
  convertToRoman(176);