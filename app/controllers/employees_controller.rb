class EmployeesController < ApplicationController
  def index
    company = Company.find(params[:company_id])
    render json: company.employees
  end

   def create
    company = Company.find(params[:company_id])
    employee = company.employees.build(employee_params)

    if employee.save
      render json: employee, status: :created
    else
      render json: { errors: employee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    company = Company.find(params[:company_id])
    employee = company.employees.find(params[:id])
    employee.destroy
    head :no_content
  end

  private
  def employee_params
    params.require(:employee).permit(:name, :email, :picture)
  end
end
