module Api
  module V1
    class ExperiencesController < ApplicationController
      skip_before_action :authenticate_request

      def index
        boat = Boat.find(params[:boat_id])
        experiences = boat.experiences

        render json: experiences.map do |exp|
          {
            id: exp.id,
            type: exp.experience_type,
            name: exp.name,
            duration: exp.duration,
            description: exp.description || [],
            price: exp.price.to_f
          }
        end
      end
    end
  end
end

