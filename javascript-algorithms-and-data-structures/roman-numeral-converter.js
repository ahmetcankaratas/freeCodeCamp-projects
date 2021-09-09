function convertToRoman(num) {
    let romen = ["","I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
    let romen2 = ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"]
    let romen3 = ["","C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
    let romen4 = ["","M","MM","MMM","MMMM"]
    let split = num.toString().split("")
    let result = "";
    switch(true){
       case (num < 10):
       result += romen[parseInt(split[0])]
       break;
       case (num < 100):
       result += romen2[parseInt(split[0])]
       result += romen[parseInt(split[1])]
       break;
       case (num < 1000):
       result += romen3[parseInt(split[0])]
       result += romen2[parseInt(split[1])]
       result += romen[parseInt(split[2])]
       break;
       case (num < 10000):
       result += romen4[parseInt(split[0])]
       result += romen3[parseInt(split[1])]
       result += romen2[parseInt(split[2])]
       result += romen[parseInt(split[3])]
       break;
    }
    console.log(result)
    return result;
   }
   
   convertToRoman(1004);