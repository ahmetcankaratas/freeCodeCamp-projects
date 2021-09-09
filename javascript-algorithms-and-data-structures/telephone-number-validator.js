function telephoneCheck(str) {
    let regex = /[0-9]|\(|\)/gi
    let regex12 = /(\([0-9]{3}\))[0-9]*-[0-9]*/gi
    let regex11 = /^1\s[0-9]*.[0-9]*.[0-9]*/
    let regex13 = /^1\s?\([0-9]{3}\)\s?[0-9]*-[0-9]*/
    let onlyNumber = str.match(regex).length
    console.log(str.match(regex13))
    if(onlyNumber === 10 ){
    return regex.test(str)
    } else if(onlyNumber === 12){
      return regex12.test(str)
    }else if(onlyNumber === 11){
      return regex11.test(str)
    }else if(onlyNumber === 13){
       return regex13.test(str)
    }
    else {
      return false
    }
  }
  
  telephoneCheck("1(555)555-5555")