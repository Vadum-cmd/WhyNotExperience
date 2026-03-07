class ApplicationController < ActionController::API
  before_action :authenticate_request

  private

  def authenticate_request
    header = request.headers['Authorization']
    token = header&.split(' ')&.last

    if token
      decoded = decode_token(token)
      @current_user = User.find(decoded['id']) if decoded
    end

    render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_user
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def decode_token(token)
    JWT.decode(
      token,
      Rails.application.credentials.secret_key_base || ENV['JWT_SECRET'] || 'secret',
      true,
      { algorithm: 'HS256' }
    ).first
  end
end

