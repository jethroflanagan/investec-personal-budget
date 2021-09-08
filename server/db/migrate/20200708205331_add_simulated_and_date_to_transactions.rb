class AddSimulatedAndDateToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :api_updated_at, :datetime
    add_column :transactions, :is_simulated, :bool, default: false
  end
end
