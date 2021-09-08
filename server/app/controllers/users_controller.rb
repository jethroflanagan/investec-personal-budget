class UsersController < ApplicationController
  def index
    users = User.all
    render json: users, include: ['first_name', 'last_name', 'id', 'groups'] 
  end

  def show
    user = User.find(user_params[:id])

    return head :not_found if user.nil?

    render json: user
  end  
  
  private

  def user_params
    params.permit(
      :id
    )
  end
end
