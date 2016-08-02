require 'sidekiq/web'
Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq'

  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      passwords: 'users/passwords',
      invitations: 'users/invitations'
    }

  resources :users do
    collection do
      get 'settings'
      patch 'update_password'
    end
  end

  resources :folders
  resources :site_maps

  get  'home/dashboard'
  get  'home/settings'

  devise_scope :user do
    root to: "devise/sessions#new"
    post 'users/bulk_invitation' => 'users/invitations#bulk_invitation'
  end

end
