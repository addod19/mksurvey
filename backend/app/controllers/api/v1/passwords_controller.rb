module Api
  module V1
    class PasswordsController < Devise::PasswordsController
      respond_to :json
    end
  end
end
