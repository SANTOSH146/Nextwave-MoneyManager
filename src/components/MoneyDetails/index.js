// Write your code here
import {Component} from 'react'
import './index.css'

const MoneyDetails = ({balance, income, expenses}) => (
  <div className="Moneydetails-container">
    <div className="detail-card-balance">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        alt="balance"
        className="icon-image"
      />
      <div className="text-container">
        <p>Your Balance</p>
        <p data-testid="balanceAmount">
          Rs <span>{balance}</span>
        </p>
      </div>
    </div>
    <div className="detail-card-income">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        alt="income"
        className="icon-image"
      />
      <div className="text-container">
        <p>Your Income</p>
        <p data-testid="incomeAmount">
          Rs <span>{income}</span>
        </p>
      </div>
    </div>
    <div className="detail-card-expense">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        alt="expenses"
        className="icon-image"
      />
      <div className="text-container">
        <p>Your Expenses</p>
        <p data-testid="expensesAmount">
          Rs <span>{expenses}</span>
        </p>
      </div>
    </div>
  </div>
)

export default MoneyDetails
