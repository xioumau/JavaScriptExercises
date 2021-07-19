/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/

function checkCashRegister(price, cash, cid) {
  var change = cash - price;
  var response = { status: "", change: [] };

  var cidAmount = cid.reduce( function (accumulator, current) {
    return accumulator + current[1];
    }, 0);

  if ( cidAmount < change ) {
    response.status = "INSUFFICIENT_FUNDS";
    return response;
  } 
  
  else if ( cidAmount === change ) {
    response.status = "CLOSED";
    response.change = cid;
    return response;
  } 

  else {
    cid = cid.reverse();
    let moneyTable = [];

    let amounts = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

    for (let i = 0; i < cid.length; i++) {
      let item = {};
      item["name"] = cid[i][0];
      item["amount"] = amounts[i];
      item["totalAmount"] = cid[i][1];
      moneyTable.push(item);
    } 

    for (let i = 0; i < moneyTable.length; i++) {
      let ele = []

      if (change >= moneyTable[i].amount && change > 0 && moneyTable[i].totalAmount > 0) {
        ele.push(moneyTable[i].name);
        let money = Math.floor(change / moneyTable[i].amount) *  moneyTable[i].amount;
        if (money > moneyTable[i].totalAmount) {
          money = moneyTable[i].totalAmount;
        }
        ele.push(money);
        change -= money;
        change = +change.toFixed(2);
        console.log(change);
        response.change.push(ele);

      }
      if (change === 0) {
        break;
      }
    }
    console.log(change);
    if (change === 0) {
      response.status = "OPEN";
    }
    else {
      response.status = "INSUFFICIENT_FUNDS";
      response.change = [];
    }
  }
  console.log(response.status);
  console.log(response.change);
  return response;
}

//test
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
