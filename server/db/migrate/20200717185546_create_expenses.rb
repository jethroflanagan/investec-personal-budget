class CreateExpenses < ActiveRecord::Migration[5.2]
  def change

    create_table :expenses do |t|
      t.integer :amount
      t.references :user
      t.datetime :date
      t.string :description
    end
    # add_reference    :transactions, :expense

    # Remove transactions columns
    remove_column :transactions, :description, :string
    remove_reference :transactions, :group
    remove_reference :transactions, :category

    # replace transactions refs with expenses
    remove_reference :groups, :transactions
    add_reference    :expenses, :group, foreign_key: true

    remove_reference :categories, :transactions
    add_reference    :expenses, :category, foreign_key: true

    remove_reference :running_totals, :transaction
    add_reference    :running_totals, :expense

    # table rename
    remove_reference :transactions, :merchant

    rename_table :transactions, :investec_transactions
    
    add_reference :investec_transactions, :merchant, foreign_key: true

  end
end
