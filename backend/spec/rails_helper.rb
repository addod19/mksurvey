# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
# Ensure a known JWT secret is available in test environment for devise-jwt
ENV['DEVISE_JWT_SECRET_KEY'] ||= 'test-jwt-secret'
require File.expand_path('../config/environment', __dir__)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'

# Require support files
Dir[Rails.root.join('spec', 'support', '**', '*.rb')].sort.each { |f| require f }

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!

  # FactoryBot methods
  config.include FactoryBot::Syntax::Methods
end
