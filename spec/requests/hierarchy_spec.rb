require 'rails_helper'

RSpec.describe "Hierarchies", type: :request do
  describe "GET /set_manager" do
    it "returns http success" do
      get "/hierarchy/set_manager"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /peers" do
    it "returns http success" do
      get "/hierarchy/peers"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /subordinates" do
    it "returns http success" do
      get "/hierarchy/subordinates"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /second_level_subordinates" do
    it "returns http success" do
      get "/hierarchy/second_level_subordinates"
      expect(response).to have_http_status(:success)
    end
  end

end
