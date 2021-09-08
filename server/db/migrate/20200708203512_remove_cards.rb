class RemoveCards < ActiveRecord::Migration[5.2]
  def change
    remove_reference :transactions, :card
    drop_table :cards
  end
end
