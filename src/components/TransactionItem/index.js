// Write your code here
import './index.css'

const TransactionItem = ({
  transactions,
  deleteTransaction,
  transactionTypeOptions,
}) => {
  // Helper function to get displayText for a given type
  const getDisplayText = type =>
    transactionTypeOptions.find(option => option.optionId === type)
      ?.displayText || type

  return (
    <div>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id} style={{marginBottom: '10px'}}>
            <span className="his-list">{transaction.title}</span>
            <span className="his-list"> - Rs {transaction.amount}</span>
            <span className="his-list">
              {' '}
              {getDisplayText(transaction.type)}
            </span>
            <button
              data-testid="delete"
              onClick={() => deleteTransaction(transaction.id)}
              style={{
                color: 'red',
                height: '5vh',
                width: '5vw',
                border: 'none',
                backgroundColor: 'none',
              }}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
                alt="delete"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionItem
