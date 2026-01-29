class ApplicationController < ActionController::API
  # Make Devise controller helper methods available (authenticate_user!, current_user, etc.)
  include Devise::Controllers::Helpers

  private

  def ensure_authenticated!
    # If Devise helpers are available, use them
    if respond_to?(:authenticate_user!)
      authenticate_user!
      return
    end

    # Fallback: try Warden directly (used by devise-jwt middleware)
    if request.env['warden']
      user = request.env['warden'].authenticate(scope: :user)
      if user
        @current_user = user
        return
      end
    end

    # Last-resort fallback: decode JWT from Authorization header using the
    # same secret as Devise (useful in development/test). This bypasses the
    # denylist check, so prefer Warden when available.
    auth_header = request.headers['Authorization'] || request.headers['HTTP_AUTHORIZATION']
    if auth_header.present?
      # Normalize token by removing spaces/newlines (some servers fold long headers)
      token = auth_header.to_s.sub(/^Bearer\s+/i, '').gsub(/\s+/, '')
      begin
        secret = ENV.fetch('DEVISE_JWT_SECRET_KEY') { Rails.application.credentials.devise_jwt_secret_key }
        payload, _ = JWT.decode(token, secret, true, algorithm: 'HS256')
        Rails.logger.info("Decoded JWT payload: #{payload.inspect}")
        user_id = payload['sub'] || payload['user_id']
        if user_id
          user = User.find_by(id: user_id)
          if user
            @current_user = user
            return
          end
        end
      rescue StandardError => _e
        # ignore decode errors and fall through to unauthorized
      end
    end

    # For local debugging, include the received Authorization header so we can
    # inspect why token auth fails. Remove this in production.
    token_clean = auth_header.to_s.sub(/^Bearer\s+/i, '').gsub(/\s+/, '')
    payload_debug = nil
    begin
      secret = ENV.fetch('DEVISE_JWT_SECRET_KEY') { Rails.application.credentials.devise_jwt_secret_key }
      payload_debug, _ = JWT.decode(token_clean, secret, true, algorithm: 'HS256')
    rescue StandardError
      payload_debug = nil
    end

    render json: { error: 'Unauthorized', auth_header: auth_header, token_clean: token_clean, payload: payload_debug }, status: :unauthorized
  end
end
