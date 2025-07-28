class SessionsController < ApplicationController
  def create
    user = Employee.find_by(email: params[:email])

    if user
      render json: user, status: :ok
    else
      render json: { error: 'Usuário não encontrado' }, status: :unauthorized
    end
  end
end
