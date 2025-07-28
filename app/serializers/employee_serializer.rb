class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :picture, :manager_id, :admin, :superadmin
end
