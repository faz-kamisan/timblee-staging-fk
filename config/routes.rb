require 'sidekiq/web'
Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq'

  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      passwords: 'users/passwords',
      confirmations: 'users/confirmations',
      invitations: 'users/invitations'
    }

  resources :users do
    collection do
      get 'settings'
      get 'progress'
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
    get 'users/:id/re_invite' => 'users/invitations#re_invite', as: :re_invite_user
    get 'users/:id/revoke' => 'users/invitations#revoke', as: :revoke_user
  end

  namespace :admin do
    resources :users do
      member do
        patch 'send_reset_link'
      end
    end
  end

end
