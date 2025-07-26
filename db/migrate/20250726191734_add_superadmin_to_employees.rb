class AddSuperadminToEmployees < ActiveRecord::Migration[7.1]
  def change
    add_column :employees, :superadmin, :boolean, default: false, null: false
  end
end
