module Api
  module V1
    class LoaderRentalsController < ApplicationController
      before_action :ensure_authenticated!

      def index
        rentals = LoaderRental.order(created_at: :desc)

        case params[:period]
        when 'week'
          rentals = rentals.where('created_at >= ?', 1.week.ago)
        when 'month'
          rentals = rentals.where('created_at >= ?', 1.month.ago)
        end

        render json: rentals, status: :ok
      end

      def create
        rental = LoaderRental.new(loader_rental_params)

        if rental.save
          render json: rental, status: :created
        else
          render json: { errors: rental.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def loader_rental_params
        params.require(:loader_rental).permit(:work_type, :price_charged, :client_name, :client_contact)
      end
    end
  end
end
