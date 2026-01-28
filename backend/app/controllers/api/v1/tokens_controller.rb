module Api
  module V1
    class TokensController < ApplicationController
      # POST /api/v1/auth/refresh
      def refresh
        rt = RefreshToken.find_by(token: cookies.signed[:refresh_token])
        if rt && !rt.revoked? && !rt.expired?
          # revoke old token and issue new tokens
          rt.update!(revoked: true)
          new_refresh = rt.user.refresh_tokens.create!(expires_at: 14.days.from_now)
          # generate new jwt via Warden sign_in (not re-authenticate)
          sign_in rt.user
          # devise-jwt will add Authorization header; to rely on cookie, set cookie:
          cookies.signed[:refresh_token] = {
            value: new_refresh.token,
            httponly: true,
            secure: Rails.env.production?,
            same_site: :none,
            expires: new_refresh.expires_at
          }
          render json: { user: current_user }, status: :ok
        else
          head :unauthorized
        end
      end
    end
  end
end