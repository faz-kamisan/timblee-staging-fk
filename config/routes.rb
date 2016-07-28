Rails.application.routes.draw do

  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      passwords: 'users/passwords'
    }

  resources :users
  resources :folders
  resources :site_maps

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  resources :folders

  get  'home/dashboard'
  devise_scope :user do
    root to: "devise/sessions#new"
  end
end
