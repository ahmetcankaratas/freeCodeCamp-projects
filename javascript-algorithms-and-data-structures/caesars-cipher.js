function rot13(str) { // LBH QVQ VG!
    let cipher = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    console.log(cipher.length)
    let result = ""
    for(let i = 0; i < str.length; i++){
        let regex = /\W/
        if(regex.test(str.charAt(i))){
        result += str.charAt(i)
      } else if(cipher.indexOf(str.charAt(i)) < 13){
         result += cipher[cipher.indexOf(str.charAt(i))+13]
      } else {
        result += cipher[cipher.indexOf(str.charAt(i))-13]
      }
    }
    console.log(result)
   return result
  }
  
  // Change the inputs below to test
  rot13("SERR CVMMN!")