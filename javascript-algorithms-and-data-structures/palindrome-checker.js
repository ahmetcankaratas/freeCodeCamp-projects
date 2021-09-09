function palindrome(str) {
    const clear = str.match(/[a-z0-9]/gi).map(x => x.toLowerCase()).join("")
    const reversed = [...clear].reverse().join("")
    const result = clear === reversed ? true : false;
    return result
  }
  
  
  
  palindrome("1 eye for of 1 eye.");