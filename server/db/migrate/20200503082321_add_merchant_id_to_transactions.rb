class AddMerchantIdToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_reference :transactions, :merchant, foreign_key: true
  end
end
