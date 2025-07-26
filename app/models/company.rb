class Company < ApplicationRecord
  has_many :employees, dependent: :destroy

  belongs_to :main_manager, class_name: "Employee", optional: true

  validates :name, presence: true
end
