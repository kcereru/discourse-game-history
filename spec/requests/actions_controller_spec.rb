require 'rails_helper'

describe discourse-game-history::ActionsController do
  before do
    Jobs.run_immediately!
  end

  it 'can list' do
    sign_in(Fabricate(:user))
    get "/discourse-game-history/list.json"
    expect(response.status).to eq(200)
  end
end
