Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users,
                controllers: {
                  sessions: 'api/v1/sessions',
                  registrations: 'api/v1/registrations'
                },
                defaults: { format: :json }

      get 'auth/me', to: 'users#me' # returns current_user
      # refresh endpoint if you implement refresh-token model (below)
      post 'auth/refresh', to: 'api/v1/tokens#refresh'

      resources :loader_rentals, only: [:index, :create]
      resources :loader_expenditures, only: [:index, :create]
      resources :survey_rentals, only: [:index, :create, :update]
      resources :blocks_productions, only: [:index, :create, :update]
    end
  end
  
  get "up" => "rails/health#show", as: :rails_health_check
end
