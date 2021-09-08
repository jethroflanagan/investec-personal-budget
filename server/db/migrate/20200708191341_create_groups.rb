class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :name
      t.references :users
      t.references :transactions

      t.timestamps
    end
  end
end
