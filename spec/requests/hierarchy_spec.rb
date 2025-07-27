require 'rails_helper'

RSpec.describe "Hierarchies", type: :request do
  let(:company) { create(:company) }
  let(:manager) { create(:employee, company: company) }
  let(:employee) { create(:employee, company: company) }

  describe "POST /set_manager" do
    it "sets a manager" do
      post "/companies/#{company.id}/employees/#{employee.id}/set_manager", params: {
        manager_id: manager.id
      }
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /peers" do
    it "returns peers" do
      e2 = create(:employee, company: company, manager: manager)
      employee.update(manager: manager)
      get "/companies/#{company.id}/employees/#{employee.id}/peers"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /subordinates" do
    it "returns direct subordinates" do
      create(:employee, company: company, manager: manager)
      get "/companies/#{company.id}/employees/#{manager.id}/subordinates"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /second_level_subordinates" do
    it "returns second-level subordinates" do
      mid = create(:employee, company: company, manager: manager)
      create(:employee, company: company, manager: mid)
      get "/companies/#{company.id}/employees/#{manager.id}/second_level_subordinates"
      expect(response).to have_http_status(:ok)
    end
  end
end
