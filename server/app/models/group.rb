class Group < ApplicationRecord
  has_many :expenses
  has_and_belongs_to_many :users
  attribute :totals
end
