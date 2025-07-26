class EmployeesController < ApplicationController
  before_action :set_company
  before_action :set_employee, only: [:destroy, :set_manager]

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
