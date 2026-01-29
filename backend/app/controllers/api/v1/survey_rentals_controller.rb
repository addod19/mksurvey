module Api
  module V1
    class SurveyRentalsController < ApplicationController
      before_action :ensure_authenticated!

      def index
        rentals = SurveyRental.order(created_at: :desc)

        case params[:period]
        when 'week'
          rentals = rentals.where('created_at >= ?', 1.week.ago)
        when 'month'
          rentals = rentals.where('created_at >= ?', 1.month.ago)
        end

        render json: rentals, status: :ok
      end

      def create
        rental = SurveyRental.new(survey_rental_params)

        if rental.save
          render json: rental, status: :created
        else
          render json: { errors: rental.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        rental = SurveyRental.find(params[:id])

        if rental.update(update_params)
          render json: rental, status: :ok
        else
          render json: { errors: rental.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def survey_rental_params
        params.require(:survey_rental).permit(:machine_color, :last_four_digits, :rentee_name, :took_stick, :points)
      end

      def update_params
        params.require(:survey_rental).permit(:points)
      end
    end
  end
end
