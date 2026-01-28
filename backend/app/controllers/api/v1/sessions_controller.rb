module Api
  module V1
    class SessionsController < Devise::SessionsController
      respond_to :json

      # Handle JSON sign in to ensure tests and API clients receive the JSON body
      def create
        # extract credentials from JSON payload (params may include nested keys in tests)
        email = params.dig(:user, :email) || params.dig(:session, :user, :email)
        password = params.dig(:user, :password) || params.dig(:session, :user, :password)

        user = User.find_for_database_authentication(email: email)

        if user&.valid_password?(password)
          # sign_in without storing session (API-only) so devise-jwt callbacks still run
          sign_in(user, store: false)
          render json: { user: user }, status: :ok
        else
          render json: { errors: ['Invalid email or password'] }, status: :unauthorized
        end
      end

      private

      def respond_with(resource, _opts = {})
        render json: { user: resource }, status: :ok
      end

      # Devise may call respond_to_on_destroy with an argument in some versions
      def respond_to_on_destroy(*_args)
        head :no_content
      end
    end
  end
end