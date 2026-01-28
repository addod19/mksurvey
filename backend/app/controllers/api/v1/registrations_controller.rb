module Api
  module V1
    class RegistrationsController < Devise::RegistrationsController
        respond_to :json

        # Override create to explicitly handle JSON payload and strong params
        def create
          # accept both canonical keys (full_name, phone_number) and legacy (name, phone)
          user_params = params.require(:user).permit(
            :email,
            :password,
            :password_confirmation,
            :role,
            :full_name,
            :phone_number,
            :name,
            :phone
          )

          # Normalize legacy keys
          full_name = user_params.delete(:full_name) || user_params.delete(:name)
          phone_number = user_params.delete(:phone_number) || user_params.delete(:phone)

          resource = User.new(user_params.to_h.merge({ full_name: full_name, phone_number: phone_number }))

          if resource.save
            render json: { user: resource }, status: :created
          else
            render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def respond_with(resource, _opts = {})
          if resource.persisted?
            render json: { user: resource }, status: :created
          else
            render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
          end
        end
    end
  end
end
