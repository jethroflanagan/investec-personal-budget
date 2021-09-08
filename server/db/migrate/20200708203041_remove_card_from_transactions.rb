class RemoveCardFromTransactions < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :account_number
  end
end
