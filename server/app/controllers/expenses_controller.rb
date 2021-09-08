class ExpensesController < ApplicationController
  def index
    expenses = Expense.all
    render json: expenses.order(date: :desc)
  end

  def show
    expense = Expense.find(params[:id])

    return head :not_found if expense.nil?

    render json: expense
  end

  def delete
    expense = Expense.find(params[:id])

    return head :not_found if expense.nil?
    
    if expense.investec_transaction
      expense.investec_transaction.update(expense: nil)
    end
    expense.destroy
    
    render json: expense
  end

  def set_group
    expense = Expense.find(expense_params[:expense_id])
    group = Group.find(expense_params[:group_id])
    expense.update(group: group)
    render json: expense
  end

  def categorize
    expense = Expense.find(expense_params[:expense_id])
    category = Category.find_or_create_by(name: expense_params[:category_name])
    expense.update(category: category)
    render json: expense
  end

  def create
    # can be nil
    transaction = InvestecTransaction.find(expense_params[:investec_transaction_id]) if expense_params[:investec_transaction_id]
    
    user = User.find(expense_params[:user_id])
    group = Group.find(expense_params[:group_id])
    category = Category.find_or_create_by(name: expense_params[:category_name])
    
    # update old expense
    if transaction&.expense
      transaction.expense.update(
        group: group,
        category: category,
        description: expense_params[:description] || transaction&.merchant.name,
        amount: expense_params[:amount] || transaction&.amount,
        user: transaction.user, # force it to be the same
      )
    else
      expense = Expense.create(
        investec_transaction: transaction,
        group: group,
        category: category,
        description: expense_params[:description] || transaction&.merchant.name,
        amount: expense_params[:amount] || transaction&.amount,
        user: user,
        date: Time.zone.now
      )

      if transaction.present?
        transaction.update(expense: expense)
      end
    end

    render json: expense
  end  

  def update
    expense = Expense.find(params[:id])
    category = Category.find_or_create_by(name: expense_params[:category_name])
    group = Group.find(expense_params[:group_id])
    user = User.find(expense_params[:user_id])
    expense.update(
      category: category,
      user: user,
      group: group,
      description: expense_params[:description],
      amount: expense_params[:amount]
    )

    render json: expense
  end

private

  def expense_params
    params.permit(
      :expense_id,
      :category_name,
      :group_id,
      :user_id,
      :investec_transaction_id,
      :description,
      :amount,
      :id_list
    )
  end
end
