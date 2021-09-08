class PublicController < ApplicationController
  def hello
    render json: { message: "Hello" }
  end
end
