function checkCashRegister(price, cash, cid) {
    var fix = function (n) {
      return Math.round(n * 100)/100;
    };
    //General
    let draw = cash-price
    //console.log("verilecek para " +draw)
    let cu = [0.01,0.05,0.10,0.25,1,5,10,20,100]
    let crName = Array.from(cid,x => x[0])
    //console.log(crName)
    let crValue = Array.from(cid,x => x[1])
    //console.log(crValue)
    let change = [];
  
  
  
    // chechCashRegister
    for(let i = cid.length-1; i >= 0; i--){ 
    while(Math.round((draw*100))/100 >= cu[i] && Math.floor(crValue[i]/cu[i]) > 0 && crValue[i] > 0){
      //console.log("verilecek para " +draw)
      crValue[i] = crValue[i] - cu[i]
  
      //console.log("verilen bankot " +cu[i])
      //console.log("kasada kalan bankot " +crValue[i])
      draw = draw - cu[i]
  
     // console.log("kalan verilecek para " +draw)
     // console.log("-----------")
    }
  }
  
    // Control Cash
    for(let i = cid.length-1; i >= 0 ; i--){
      cid[i][1] !== crValue[i] ? change.push([crName[i],fix(cid[i][1]-crValue[i])]) :""
    }
  
    
    const totalCid = cid.reduce((sum,x) => sum+x[1],0)
  
     if(totalCid === cash-price){
      return {status: "CLOSED", change: cid}
    }
    else if(draw > 0){
      return {status: "INSUFFICIENT_FUNDS", change: []}
    } 
      else{
      return {status: "OPEN", change: change}
    }
  
  }
  
  
  checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])