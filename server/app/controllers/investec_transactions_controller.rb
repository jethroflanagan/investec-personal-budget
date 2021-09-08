class InvestecTransactionsController < ApplicationController
  def index
    transactions = InvestecTransaction.all.where(is_simulated: false)
    render json: transactions.order(api_updated_at: :desc)
  end

  def create
    begin
      user = User.find(transaction_params[:user_id])
    rescue ActiveRecord::RecordNotFound
      return render json: { error: "Not a valid user" } unless user.present?
    end

    merchant = Merchant.find_or_create_by(code: transaction_params[:merchant_code]) do |m|
      m.code = transaction_params[:merchant_code]
      m.name = transaction_params[:merchant_name]
      m.city = transaction_params[:merchant_city]
      m.country_code = transaction_params[:merchant_country_code]
    end

    begin
      transaction = InvestecTransaction.create!(
        # account_number: transaction_params[:account_number],
        amount: transaction_params[:amount] / 100,
        currency_code: transaction_params[:currency_code],
        is_simulated: transaction_params[:is_simulated],
        # card_id: transaction_params[:card_id],
        api_updated_at: DateTime.now, # transaction_params[:date_time],
        user: user,
        merchant: merchant
      )
    rescue ActiveRecord::RecordInvalid => error
      return render json: { error: error }
    end

    render json: transaction
  end

  def show
    transaction = InvestecTransaction.find(params[:id])

    return head :not_found if transaction.nil?

    render json: transaction
  end

  # TODO: fix this
  def ungrouped
    transactions = InvestecTransaction.where(expense: nil)
    render json: transactions
  end

  def create_expense

  end

  private

  def transaction_params
    params.permit(
      :account_number,
      :amount,
      :currency_code,
      :card_id,
      :merchant_name,
      :merchant_code,
      :merchant_city,
      :merchant_country_code,
      :is_simulated,
      :date_time,
      :user_id,
    )
  end
end
