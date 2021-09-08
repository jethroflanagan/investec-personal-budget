class MerchantsController < ApplicationController
  def index
    merchants = Merchant.all
    render json: merchants
  end

  def show
    merchant = Merchant.find(params[:id])
    render json: merchant
  end

  def post
    render json: { message: "Success" }
  end

  private

  def save_params

  end
end
