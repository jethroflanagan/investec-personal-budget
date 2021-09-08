class GroupSerializer < ActiveModel::Serializer
  attributes :id
  attributes :name
  attributes :totals
  attributes :color
  
  attributes :expenses
  def expenses
    object.expenses.map(&:id)
  end
  
  # has_many :expenses
  
  # def expenses
  #   object.expenses.order(date: :desc)
  # end

  attributes :expenses_count
  def expenses_count
    object.expenses.count
  end
end
