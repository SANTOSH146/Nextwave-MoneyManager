import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

// import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactions: [],
    title: '',
    amount: '',
    type: 'INCOME',
    balance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onAddTransaction = transaction => {
    this.setState(prevState => {
      const {transactions, totalIncome, totalExpenses, balance} = prevState
      const updatedTransactions = [...transactions, transaction]

      if (transaction.type === 'INCOME') {
        return {
          transactions: updatedTransactions,
          totalIncome: totalIncome + transaction.amount,
          balance: balance + transaction.amount,
          title: '',
          amount: '',
          type: 'Income',
        }
      }

      return {
        transactions: updatedTransactions,
        totalExpenses: totalExpenses + transaction.amount,
        balance: balance - transaction.amount,
        title: '',
        amount: '',
        type: 'Expenses',
      }
    })
  }

  deleteTransaction = id => {
    const {transactions} = this.state
    const transactionToRemove = transactions.find(item => item.id === id)

    if (transactionToRemove.type === 'INCOME') {
      this.setState(prevState => ({
        transactions: prevState.transactions.filter(item => item.id !== id),
        totalIncome: prevState.totalIncome - transactionToRemove.amount,
        balance: prevState.balance - transactionToRemove.amount,
      }))
    } else {
      this.setState(prevState => ({
        transactions: prevState.transactions.filter(item => item.id !== id),
        totalExpenses: prevState.totalExpenses - transactionToRemove.amount,
        balance: prevState.balance + transactionToRemove.amount,
      }))
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const {title, amount, type} = this.state
    if (title.trim() && amount.trim() && !Number.isNaN(amount)) {
      const transaction = {
        id: uuidv4(),
        title,
        amount: parseInt(amount, 10),
        type, // Either 'INCOME' or 'EXPENSES'
      }

      this.onAddTransaction(transaction)
      //   console.log('New Transaction:', transaction)
    }

    // Reset the form
  }

  render() {
    const {
      transactions,
      title,
      amount,
      type,
      balance,
      totalIncome,
      totalExpenses,
    } = this.state

    return (
      <div className="page">
        <div className="moneymanager-card">
          <div className="text">
            <h1>Hi,Richard</h1>
            <p>
              Welcome back to your{' '}
              <span className="highlighted-text">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balance={balance}
            income={totalIncome}
            expenses={totalExpenses}
          />
          <div className="third-container">
            <div className="add-transaction-form">
              <div className="form-temp">
                <h1>Add Transaction</h1>
                <form onSubmit={this.handleSubmit}>
                  <div className="input-label">
                    <label htmlFor="title">TITLE</label>
                    <input
                      type="text"
                      placeholder="TITLE"
                      name="title"
                      value={title}
                      id="title"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-label">
                    <label htmlFor="amount">AMOUNT</label>
                    <input
                      type="text"
                      placeholder="AMOUNT"
                      name="amount"
                      value={amount}
                      id="amount"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-label">
                    <label htmlFor="transactionType">TYPE</label>
                    <select
                      id="transactionType"
                      value={type}
                      onChange={this.handleChange}
                      name="type"
                    >
                      {transactionTypeOptions.map(option => (
                        <option key={option.optionId} value={option.optionId}>
                          {option.displayText}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="add-btn">
                    ADD
                  </button>
                </form>
              </div>
            </div>
            <div className="add-transaction-history">
              <div className="form-temp">
                <h1>History</h1>
                <li className="history-list">
                  <p className="his-item">Title</p>
                  <p className="his-item">Amount</p>
                  <p>Type</p>
                </li>
                <TransactionItem
                  transactionTypeOptions={transactionTypeOptions}
                  transactions={transactions}
                  deleteTransaction={this.deleteTransaction}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
