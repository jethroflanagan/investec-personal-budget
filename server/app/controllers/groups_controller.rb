class GroupsController < ApplicationController
  def index
    groups = Group.all
    render json: groups, include: ['name', 'id', 'expenses_count']
  end

  def show
    group = Group.find(group_params[:id])

    return head :not_found if group.nil?

    totals = get_totals(group)
    group[:totals] = totals
    render json: group, include: %w(
      expenses 
      expenses.category_id 
      expenses.group_id 
      expenses.investec_transaction 
    ).join(',')
  end  
  
  private

  def group_params
    params.permit(
      :id
    )
  end

  def get_totals(group)
    # TODO: use the runing_totals table instead for performance
    totals = group.users.map do | user |
      expenses = Expense.all.where(
        group: group,
        user: user
      )

      total = expenses.reduce(0) do | sum, expense |
        sum + expense.amount
      end
      { user: user, total: total }
    end
  end
end
