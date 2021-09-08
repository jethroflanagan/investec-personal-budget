class User < ApplicationRecord
  has_many :transactions
  has_many :expenses
  has_and_belongs_to_many :groups

  def name
    "#{first_name} #{last_name}"
  end
end
