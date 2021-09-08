Rails.application.routes.draw do
  get 'private/hello'
  get 'public/hello'

  # namespace :investec do
  #   resources :transactions
  # end
  
  resources :merchants

  resources :categories
  
  resources :groups
  
  resources :users
  
  get 'transactions/ungrouped', to: 'investec_transactions#ungrouped'
  resources :transactions, controller: 'investec_transactions'

  resources :expenses do
    post 'group', to: 'expenses#set_group'
    post 'category', to: 'expenses#categorize'
  end


end
