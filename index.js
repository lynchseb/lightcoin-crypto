class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
    balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}
class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if(this.isAllowed() <= 0){
      return false;
    }
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
  }

}
class Deposit extends Transaction {
    get value () {
    return this.amount;

    }
    isAllowed() {
      return true;
    }

}

class Withdrawal extends Transaction {
    get value () {
      return -this.amount;
    }

    isAllowed() {
    return(this.account.balance - this.amount >= 0)
    }
}





// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const account1 = new Account('billybob');

console.log('Starting Balance:', account1.balance);

const t1 = new Deposit(120.00, account1);
t1.commit();

const t2 = new Withdrawal(90.00, account1);
t2.commit();

console.log('Ending Balance:', account1.balance);
console.log(account1.transactions)

