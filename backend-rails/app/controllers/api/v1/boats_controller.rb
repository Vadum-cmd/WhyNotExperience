module Api
  module V1
    class BoatsController < ApplicationController
      skip_before_action :authenticate_request, only: [:index, :show, :search]

      def index
        boats = Boat.all
        boats = boats.by_location(params[:location]) if params[:location].present?
        boats = boats.by_price_range(params[:minPrice], params[:maxPrice]) if params[:minPrice].present? || params[:maxPrice].present?
        boats = boats.by_rating(params[:minRating]) if params[:minRating].present?
        boats = boats.by_capacity(params[:capacity]) if params[:capacity].present?

        render json: boats.map { |boat| boat_response(boat) }
      end

      def show
        boat = Boat.find_by(id: params[:id])
        if boat.nil?
          render json: { error: 'Boat not found' }, status: :not_found
          return
        end
        
        date_from = params[:dateFrom] || Date.current
        date_to = params[:dateTo] || 30.days.from_now.to_date

        render json: boat_response(boat, include_details: true, date_from: date_from, date_to: date_to)
      end

      def search
        query = params[:q]
        boats = Boat.where("name ILIKE ? OR model ILIKE ? OR location ILIKE ?", 
                          "%#{query}%", "%#{query}%", "%#{query}%")

        # Apply filters
        boats = boats.by_location(params[:location]) if params[:location].present?
        boats = boats.by_price_range(params[:minPrice], params[:maxPrice]) if params[:minPrice].present? || params[:maxPrice].present?

        render json: boats.map { |boat| boat_response(boat) }
      end

      private

      def boat_response(boat, include_details: false, date_from: nil, date_to: nil)
        response = {
          id: boat.id,
          name: boat.name,
          model: boat.model,
          year: boat.year,
          location: boat.location,
          capacity: boat.capacity,
          cabins: boat.cabins,
          length: boat.length.to_f,
          price: boat.price.to_f,
          rating: boat.rating.to_f,
          reviewCount: boat.review_count,
          images: boat.images || [],
          host: {
            id: boat.host.id,
            name: boat.host.name
          }
        }

        if include_details
          response[:experiences] = boat.experiences.map do |exp|
            {
              id: exp.id,
              type: exp.type,
              name: exp.name,
              duration: exp.duration,
              description: exp.description || [],
              price: exp.price.to_f
            }
          end

          if date_from && date_to
            response[:availableDates] = boat.available_dates(
              start_date: date_from.to_date,
              end_date: date_to.to_date
            ).map(&:to_s)
          else
            response[:availableDates] = []
          end
        else
          response[:availableDates] = []
          response[:experiences] = []
        end

        response
      end
    end
  end
end

