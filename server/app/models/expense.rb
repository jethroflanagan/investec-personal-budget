class Expense < ApplicationRecord
  belongs_to :user
  belongs_to :group
  belongs_to :category, optional: true
  has_one :investec_transaction
end
