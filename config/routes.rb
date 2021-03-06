require 'sidekiq/web'
Rails.application.routes.draw do
  mount ForestLiana::Engine => '/forest'
  mount Sidekiq::Web, at: '/sidekiq'

  devise_scope :user do
    get "users/sign-up" => "devise/registrations#new", as: "new_user_registration"
    get "users/sign-up-60" => "devise/registrations#new", as: "new_user_registration_60_day_trial"
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords',
    confirmations: 'users/confirmations',
    invitations: 'users/invitations'
  }, skip: [:sessions]

  as :user do
    get 'users/log-in' => 'users/sessions#new', :as => :new_user_session
    get 'log-in' => 'users/sessions#new'
    post 'log-in' => 'users/sessions#create', :as => :user_session
    match 'signout' => 'users/sessions#destroy', :as => :destroy_user_session,
      :via => Devise.mappings[:user].sign_out_via
  end

  resources :users do
    collection do
      get 'settings'
      get 'settings/:tab', as: 'settings_tab', to: 'users#settings', constraints: { tab: /my-info|team|personalization|billing/}
      get 'progress'
      patch 'update_password'
      patch 'update_avatar'
      get 'validate_unique_email'
    end
  end

  resources :folders
  resources :sitemaps do
    resources :userflows do
      collection do
        post 'crud_screens'
      end
      member do
        post 'crud_screens'
      end
    end
    member do
      post :generate_pdf
      get :download_pdf
      get :generate_png
      get :download_png
      get :preview
      get :preview_png
      post :share_via_email
    end
    patch 'rename'
    post 'rename'
    post 'duplicate'
  end
  resources :comments, only: [:create, :update, :destroy]
  resources :pages, only: [:create, :update, :destroy]
  resources :sections, only: [:create, :destroy, :update]
  resources :guests, only: [:create]

  get  'home', to: 'home#dashboard', as: 'home_dashboard'
  get  'home/intro'
  # get  'home/settings'


  scope module: :super_admin do
    get '/admin', to: 'main#dashboard', as: 'admin_dashboard'
    post '/impersonate', to: 'main#impersonate', as: 'admin_impersonate'
  end

  get '/:token' => 'sitemaps#public_share', :constraints => { subdomain: /share/ }, as: :sitemap_public_share

  subdomain = Rails.env.production? ? /start/ : /app/
  get '/' => 'sitemaps#trial', :constraints => { :subdomain => subdomain }, as: :sitemap_trial


  devise_scope :user do
    root to: "users/sessions#new"
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
      get 'delete_account'
    end
  end

  resources :notifications, only: [] do
    collection do
      get 'load_more'
    end
  end

  namespace :businesses do
    resource :card, only: [:create]
    resource :subscription, only: [:create] do
      post 'webhook', on: :collection
    end
  end

end
