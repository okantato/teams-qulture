require 'rails_helper'

RSpec.describe "Employees", type: :request do
  let(:company) { create(:company) }

  describe "GET /companies/:company_id/employees" do
    it "returns http success" do
      create_list(:employee, 2, company: company)
      get "/companies/#{company.id}/employees"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /companies/:company_id/employees" do
    it "creates an employee" do
      post "/companies/#{company.id}/employees", params: {
        employee: {
          name: "John Doe",
          email: "john@example.com",
          picture: "https://via.placeholder.com/150"
        }
      }
      expect(response).to have_http_status(:created)
    end
  end

  describe "DELETE /companies/:company_id/employees/:id" do
    it "deletes an employee" do
      employee = create(:employee, company: company)
      delete "/companies/#{company.id}/employees/#{employee.id}"
      expect(response).to have_http_status(:no_content)
    end
  end
end
