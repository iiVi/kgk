Rails.application.routes.draw do
	root 'items#index'
  resources :items, except: [:new, :edit]
end
