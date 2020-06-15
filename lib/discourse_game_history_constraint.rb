class DiscourseGameHistoryConstraint
  def matches?(request)
    SiteSetting.discourse_game_history_enabled
  end
end
