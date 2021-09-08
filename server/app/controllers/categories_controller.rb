class CategoriesController < ApplicationController

  def index
    categories = Category.all
    render json: categories, include: ['name', 'id'] 
  end

  def show
    category = Category.find(params[:id])

    return head :not_found if category.nil?

    render json: category
  end

end
