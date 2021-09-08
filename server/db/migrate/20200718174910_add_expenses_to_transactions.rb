class AddExpensesToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_reference :investec_transactions, :expense, index: { unique: true }
    add_reference :expenses, :investec_transaction, index: { unique: true }
  end
end
