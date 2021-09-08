class ApplicationController < ActionController::API
  # protect_from_forgery with: :null_session
  before_action :underscore_params!

  def underscore_params!
    # TODO: support deep underscore
    params.transform_keys! { |key| key.underscore }
  end

end
