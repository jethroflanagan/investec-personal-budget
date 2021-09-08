class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :amount
      t.string :account_number
      t.string :currency_code
    end
  end
end
