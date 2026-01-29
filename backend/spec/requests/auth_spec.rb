# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Authentication', type: :request do
  let(:email) { 'user@example.com' }
  let(:password) { 'password123' }

  before do
    # create a user directly (bypass sign_up controller if not implemented)
    User.create!(email: email, password: password, password_confirmation: password, role: 'survey_admin')
  end

  it 'signs in and returns the user and Authorization header' do
    post '/api/v1/users/sign_in', params: { user: { email: email, password: password } }, as: :json
    expect(response).to have_http_status(:ok)
    body = JSON.parse(response.body)
    expect(body['user']).to be_present
    expect(body['user']['email']).to eq(email)
    token = response.headers['Authorization'] || response.headers['authorization']
    expect(token).to be_present
  end

  it 'signs out and creates a denylist entry' do
    # sign in first
    post '/api/v1/users/sign_in', params: { user: { email: email, password: password } }, as: :json
    token = response.headers['Authorization'] || response.headers['authorization']
    expect(token).to be_present

    # call sign out with the token in Authorization header
    delete '/api/v1/users/sign_out', headers: { 'Authorization' => token }, as: :json
    # sessions_controller respond_to_on_destroy returns no_content
    expect(response).to have_http_status(:no_content)

    # expect that a JwtDenylist entry exists
    expect(JwtDenylist.count).to be >= 1
  end
end
