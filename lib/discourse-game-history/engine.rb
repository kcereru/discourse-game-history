module DiscourseGameHistory
  class Engine < ::Rails::Engine
    engine_name "DiscourseGameHistory".freeze
    isolate_namespace DiscourseGameHistory

    config.after_initialize do
      Discourse::Application.routes.append do
        mount ::DiscourseGameHistory::Engine, at: "/discourse-game-history"
      end
    end
  end
end
