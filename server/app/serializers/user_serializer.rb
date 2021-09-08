class UserSerializer < ActiveModel::Serializer
  attributes :id
  attributes :name
  attributes :first_name
  attributes :last_name
  # has_many :transactions
  
  attributes :avatar
  def avatar
    ActionController::Base.helpers.image_path object.avatar
  end
  
  attributes :groups
  def groups
    object.groups.map(&:id)
  end
end
