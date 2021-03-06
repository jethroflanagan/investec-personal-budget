class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name
      t.references :transactions
    end

    add_reference :transactions, :category, foreign_key: true
  end
end
