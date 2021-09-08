class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :number
    end

    add_reference :transactions, :card, foreign_key: true
  end
end
