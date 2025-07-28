# db/seeds.rb
require 'faker'

company = Company.create!(name: "Qulture Team")

# Cria SuperAdmin
Employee.create!(
  name: "Super Admin",
  email: "superadmin@qulture.com",
  company: company,
  superadmin: true
)

# Cria Admin
Employee.create!(
  name: "Admin Master",
  email: "admin@qulture.com",
  company: company,
  admin: true
)

# Cria Users normais
10.times do
  Employee.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    picture: Faker::Avatar.image,
    company: company
  )
end
