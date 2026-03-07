module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :authenticate_request, only: [:register, :login]

      def register
        begin
          user = User.new(user_params)
          user.password = params[:password]

          if user.save
            token = user.generate_jwt_token
            render json: {
              user: user_response(user),
              token: token
            }, status: :created
          else
            render json: { 
              error: user.errors.full_messages.join(', '),
              message: user.errors.full_messages.join(', ')
            }, status: :unprocessable_entity
          end
        rescue => e
          Rails.logger.error "Registration error: #{e.message}"
          Rails.logger.error e.backtrace.join("\n")
          render json: { 
            error: "Registration failed: #{e.message}",
            message: "Registration failed: #{e.message}"
          }, status: :internal_server_error
        end
      end

      def login
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
          token = user.generate_jwt_token
          render json: {
            user: user_response(user),
            token: token
          }
        else
          render json: { error: 'Invalid credentials' }, status: :unauthorized
        end
      end

      def me
        render json: user_response(@current_user)
      end

      private

      def user_params
        permitted = params.permit(:email, :name, :role)
        # Ensure role is a valid enum value (Rails enum accepts string keys)
        if permitted[:role].present?
          permitted[:role] = permitted[:role].to_s.downcase
        end
        permitted
      end

      def user_response(user)
        {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      end
    end
  end
end

