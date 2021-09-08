class InvestecTransaction < ApplicationRecord
  belongs_to :user
  belongs_to :merchant
  has_one :expense
end
