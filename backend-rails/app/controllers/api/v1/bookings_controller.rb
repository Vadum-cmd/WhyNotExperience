module Api
  module V1
    class BookingsController < ApplicationController
      before_action :set_booking, only: [:show, :destroy]

      def index
        bookings = @current_user.bookings.includes(:boat, :experience).order(created_at: :desc)
        render json: bookings.map { |booking| booking_response(booking) }
      end

      def show
        render json: booking_response(@booking)
      end

      def create
        booking = @current_user.bookings.build(booking_params)
        booking.status = :pending

        experience = Experience.find(booking.experience_id)
        booking.duration = experience.duration

        if booking.save
          begin
            GovernmentalEmailService.new.send_booking_confirmation(booking)
            booking.update(status: :confirmed)
          rescue => e
            Rails.logger.error("Failed to send governmental email: #{e.message}")
          end
          render json: booking_response(booking), status: :created
        else
          render json: { error: booking.errors.full_messages.join(', ') }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound => e
        Rails.logger.warn("Booking create RecordNotFound: #{e.message}")
        render json: { error: "Boat or experience not found." }, status: :unprocessable_entity
      rescue StandardError => e
        Rails.logger.error("Booking create error: #{e.class} #{e.message}\n#{e.backtrace.first(5).join("\n")}")
        render json: { error: e.message.presence || "Booking could not be created." }, status: :unprocessable_entity
      end

      def destroy
        if @booking.user_id == @current_user.id
          @booking.update(status: :cancelled)
          head :no_content
        else
          render json: { error: 'Unauthorized' }, status: :forbidden
        end
      end

      private

      def set_booking
        @booking = Booking.find(params[:id])
      end

      def booking_params
        params.permit(:boat_id, :experience_id, :date, :start_time, :guests, guest_documents: [])
      end

      def booking_response(booking)
        {
          id: booking.id,
          userId: booking.user_id,
          boatId: booking.boat_id,
          boatName: booking.boat.name,
          experienceId: booking.experience_id,
          experienceName: booking.experience.name,
          date: booking.date.to_s,
          startTime: booking.start_time.strftime("%H:%M"),
          endTime: booking.end_time.strftime("%H:%M"),
          duration: booking.duration,
          guests: booking.guests,
          totalPrice: booking.total_price.to_f,
          status: booking.status,
          guestDocuments: booking.guest_documents || [],
          createdAt: booking.created_at.iso8601
        }
      end
    end
  end
end

