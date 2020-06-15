module DiscourseGameHistory
  class DiscourseGameHistoryController < ::ApplicationController
    requires_plugin DiscourseGameHistory

    before_action :ensure_logged_in

    def index
    end
  end
end
