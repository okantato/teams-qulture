class AddMainManagerToCompanies < ActiveRecord::Migration[7.1]
  def change
    add_column :companies, :main_manager_id, :bigint
    add_foreign_key :companies, :employees, column: :main_manager_id
    add_index :companies, :main_manager_id
  end
end
