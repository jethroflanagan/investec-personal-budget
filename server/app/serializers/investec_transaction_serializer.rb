class InvestecTransactionSerializer < ActiveModel::Serializer
  attributes :id
  attributes :user_id
  attributes :amount
  attributes :currency_code
  attributes :merchant_id
  attributes :expense_id
  # has_one    :expense
  attributes :is_simulated
  
  attributes :updated_at
  def updated_at
    object.api_updated_at
  end

  attributes :group_id
  def group_id
    object.expense&.group&.id
  end
end
