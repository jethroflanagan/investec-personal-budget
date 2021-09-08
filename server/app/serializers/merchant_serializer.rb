class MerchantSerializer < ActiveModel::Serializer
  attributes :id
  attributes :name
  attributes :city
  attributes :country_code
  attributes :code
end
