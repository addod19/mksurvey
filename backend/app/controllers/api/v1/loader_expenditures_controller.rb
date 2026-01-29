module Api
  module V1
    class LoaderExpendituresController < ApplicationController
      before_action :ensure_authenticated!

      def index
        expenditures = LoaderExpenditure.order(created_at: :desc)

        case params[:period]
        when 'week'
          expenditures = expenditures.where('created_at >= ?', 1.week.ago)
        when 'month'
          expenditures = expenditures.where('created_at >= ?', 1.month.ago)
        end

        render json: expenditures, status: :ok
      end

      def create
        expenditure = LoaderExpenditure.new(loader_expenditure_params)

        if expenditure.save
          render json: expenditure, status: :created
        else
          render json: { errors: expenditure.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def loader_expenditure_params
        params.require(:loader_expenditure).permit(:fuel, :washing, :greasing, :chop_money)
      end
    end
  end
end
