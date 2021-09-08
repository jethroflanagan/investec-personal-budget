class PrivateController < ApplicationController
  include Secured

  def hello
    render json: { message: "Secret hello" }
  end
end
