class CreateGroupTotals < ActiveRecord::Migration[5.2]
  def change
    create_table :running_totals do |t|
      t.references :user
      t.references :transaction
      t.float :total
    end

    create_join_table :groups, :running_totals
  end
end
