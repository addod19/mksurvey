module Api
  module V1
    class BlocksProductionsController < ApplicationController
      before_action :ensure_authenticated!

      def index
        productions = BlocksProduction.order(created_at: :desc)

        case params[:period]
        when 'week'
          productions = productions.where('created_at >= ?', 1.week.ago)
        when 'month'
          productions = productions.where('created_at >= ?', 1.month.ago)
        end

        render json: productions, status: :ok
      end

      def create
        production = BlocksProduction.new(blocks_production_params)

        if production.save
          render json: production, status: :created
        else
          render json: { errors: production.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        production = BlocksProduction.find(params[:id])

        if production.update(update_params)
          render json: production, status: :ok
        else
          render json: { errors: production.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def blocks_production_params
        params.require(:blocks_production).permit(
          :block_size,
          :block_type,
          :blocks_produced,
          :cement_bags,
          :dust_trips,
          :dust_cost,
          :manufacturing_pay,
          :water_cost,
          :electricity_cost,
          :blocks_sold,
          :amount_sold
        )
      end

      def update_params
        params.require(:blocks_production).permit(:water_cost, :electricity_cost, :blocks_sold, :amount_sold)
      end
    end
  end
end
