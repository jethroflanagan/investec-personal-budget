class CategorySerializer < ActiveModel::Serializer
  attributes :id
  attributes :name
  
  # attributes :investec_transactions
  # def investec_transactions 
  #   object.investec_transactions&.map(&:id)
  # end
end
