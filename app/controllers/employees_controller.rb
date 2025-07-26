class EmployeesController < ApplicationController
  before_action :set_company
  before_action :set_employee, only: [:destroy, :set_manager, :peers, :subordinates, :second_level_subordinates]

  def index
    render json: @company.employees
  end

  def create
    employee = @company.employees.build(employee_params)

    if employee.save
      render json: employee, status: :created
    else
      render json: { errors: employee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @employee.destroy
    head :no_content
  end

  def set_manager
    manager = @company.employees.find(params[:manager_id])
    @employee.manager = manager

    if @employee.save
      render json: @employee, status: :ok
    else
      render json: { errors: @employee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def peers
    if @employee.manager.nil?
      # Se o funcionário não tem gestor, peers são outros funcionários sem gestor na mesma empresa
      peers = @company.employees.where(manager_id: nil).where.not(id: @employee.id)
    else
      # Peers são funcionários que tem o mesmo gestor
      peers = @company.employees.where(manager_id: @employee.manager_id).where.not(id: @employee.id)
    end
    render json: peers
  end

  def subordinates
    subs = @company.employees.where(manager_id: @employee.id)
    render json: subs
  end

  def second_level_subordinates
    first_level_ids = @company.employees.where(manager_id: @employee.id).pluck(:id)
    second_level_subs = @company.employees.where(manager_id: first_level_ids)
    render json: second_level_subs
  end

  private

  def set_company
    @company = Company.find(params[:company_id])
  end

  def set_employee
    @employee = @company.employees.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(:name, :email, :picture, :manager_id, :admin, :superadmin)
  end
end
