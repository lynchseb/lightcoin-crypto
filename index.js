
class Account {

  constructor(username) {
    this.username = username;
    this.transactions = []

  }

  get balance() {
   let total = 0
   this.transactions.forEach((transaction) => {
    total += transaction.value;
   })
   return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction)
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if(!this.isAllowed()){
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this)


  }
}


class Withdrawal extends Transaction {

  get value() {
    return -this.amount
  }

  isAllowed() {
   if (this.account.balance - this.amount <= 0){
     console.log("Insufficient funds")
     return false;
   } else {
     console.log(`You have withdrawn ${this.amount}, you now have ${this.account.balance - this.amount} left`)
     return (this.account.balance - this.amount)
   }


  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount
  }

  isAllowed(){
    console.log(`You have deposited ${this.amount}`)
    return true;
  }


}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(40, myAccount);
t2.commit();



console.log('Ending Balance:', myAccount.balance);
