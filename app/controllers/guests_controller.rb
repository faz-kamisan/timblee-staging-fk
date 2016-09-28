class GuestsController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:create]

  def create
    guest = Guest.find_or_initialize_by(email: params[:email]).tap { |guest| guest.full_name = params[:name] }
    if guest.save
      session[:guest_user_id] = guest.id
      render json: guest.as_json, status: 200
    else
      render json: t('.failure', scope: :flash) , status: 522
    end
  end
end
