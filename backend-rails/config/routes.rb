Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Authentication
      post 'auth/register', to: 'auth#register'
      post 'auth/login', to: 'auth#login'
      get 'auth/me', to: 'auth#me'

      # Boats
      resources :boats, only: [:index, :show] do
        collection do
          get 'search', to: 'boats#search'
        end
      end

      # Bookings
      resources :bookings, only: [:index, :show, :create, :destroy]

      # Experiences (nested under boats)
      resources :boats, only: [] do
        resources :experiences, only: [:index]
      end
    end
  end

  # Health check
  get 'health', to: 'health#check'
end

