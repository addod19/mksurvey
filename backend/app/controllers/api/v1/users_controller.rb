module Api
  module V1
    class UsersController < ApplicationController
      before_action :ensure_authenticated!

      def me
        # Development-only diagnostics: when DEBUG_AUTH env var is set, return
        # diagnostic information to help trace why authentication fails.
        if Rails.env.development? && ENV['DEBUG_AUTH'] == '1'
          auth_header = request.headers['Authorization'] || request.headers['HTTP_AUTHORIZATION']
          warden_present = request.env.key?('warden')
          warden_user = request.env['warden'] && request.env['warden'].user(:user)

          jwt_payload = nil
          if auth_header.present?
            token = auth_header.to_s.sub(/^Bearer\s+/i, '')
            begin
              jwt_payload, _ = JWT.decode(token, ENV['DEVISE_JWT_SECRET_KEY'], true, algorithm: 'HS256')
            rescue StandardError => _e
              jwt_payload = { error: 'decode_failed' }
            end
          end

          return render json: {
            header: auth_header,
            warden_present: warden_present,
            warden_user_id: (warden_user && warden_user.id),
            jwt_payload: jwt_payload
          }, status: :ok
        end

        # Use Devise's current_user if available, otherwise use fallback
        user = respond_to?(:current_user) ? current_user : @current_user
        render json: { user: user }, status: :ok
      end

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
  end
end
