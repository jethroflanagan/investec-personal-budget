class ExpenseSerializer < ActiveModel::Serializer
  attributes :id
  attributes :user_id
  attributes :amount
  attributes :description
  attributes :group_id
  attributes :category_id
  # has_one    :investec_transaction
  attributes :investec_transaction_id
  attributes :date
end
