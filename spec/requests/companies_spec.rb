require 'rails_helper'

RSpec.describe "Companies", type: :request do
  describe "GET /companies" do
    it "returns http success" do
      create_list(:company, 3)
      get "/companies"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /companies/:id" do
    it "returns http success" do
      company = create(:company)
      get "/companies/#{company.id}"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /companies" do
    it "creates a company" do
      post "/companies", params: { company: { name: "Empresa Nova" } }
      expect(response).to have_http_status(:created)
    end
  end
end

