class Employee < ApplicationRecord
  belongs_to :company
  belongs_to :manager, class_name: 'Employee', optional: true
  has_many :subordinates, class_name: 'Employee', foreign_key: :manager_id

  validates :name, :email, presence: true
  validate :manager_must_be_from_same_company
  validate :no_cycles_in_hierarchy

  def manager_must_be_from_same_company
    return if manager.nil?
    errors.add(:manager, 'must belong to the same company') if manager.company_id != company_id
  end

  def no_cycles_in_hierarchy
    current = manager
    while current
      if current == self
        errors.add(:manager, 'creates a cycle in the hierarchy')
        break
      end
      current = current.manager
    end
  end
end
