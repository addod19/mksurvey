class ApplicationController < ActionController::API
  # Make Devise controller helper methods available (authenticate_user!, current_user, etc.)
  include Devise::Controllers::Helpers
end
