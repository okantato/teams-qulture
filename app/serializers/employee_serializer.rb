class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :picture, :admin, :superadmin, :company_id, :manager_id, :company_name

  def company_name
    object.company.name
  end
end

