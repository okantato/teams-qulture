Rails.application.routes.draw do
  resources :companies, only: [:index, :show, :create] do
    resources :employees, only: [:index, :create, :destroy] do
      member do
        post :set_manager
        get :peers
        get :subordinates
        get :second_level_subordinates
      end
    end
  end


  get "up" => "rails/health#show", as: :rails_health_check
end
