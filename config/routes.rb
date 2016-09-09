require 'sidekiq/web'
Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  mount Sidekiq::Web, at: '/sidekiq'

  devise_scope :user do
    get "users/sign-up" => "devise/registrations#new", as: "new_user_registration"
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords',
    confirmations: 'users/confirmations',
    invitations: 'users/invitations'
  }, skip: [:sessions]

  as :user do
    get 'users/log-in' => 'devise/sessions#new', :as => :new_user_session
    post 'log-in' => 'devise/sessions#create', :as => :user_session
    match 'signout' => 'devise/sessions#destroy', :as => :destroy_user_session,
      :via => Devise.mappings[:user].sign_out_via
  end

  resources :users do
    collection do
      get 'settings'
      get 'progress'
      patch 'update_password'
      patch 'update_avatar'
      get 'validate_unique_email'
    end
  end

  resources :folders
  resources :sitemaps
  resources :comments, only: [:create, :update, :destroy]
  resources :pages, only: [:create, :update, :destroy]

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

  resources :businesses, only: [:update] do
    member do
      get 'send_destroy_request_to_superadmin'
    end
  end

  namespace :businesses do
    resource :card, only: [:create]
    resource :subscription, only: [:create] do
      post 'webhook', on: :collection
    end
  end
end
