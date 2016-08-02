Rails.application.routes.draw do

  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      passwords: 'users/passwords'
    }

  resources :users
  resources :folders
  resources :site_maps

  get  'home/dashboard'

  devise_scope :user do
    root to: "devise/sessions#new"
  end
end
