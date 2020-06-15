require_dependency "discourse_game_history_constraint"

DiscourseGameHistory::Engine.routes.draw do
  get "/" => "discourse_game_history#index", constraints: DiscourseGameHistoryConstraint.new
  get "/actions" => "actions#index", constraints: DiscourseGameHistoryConstraint.new
  get "/actions/:id" => "actions#show", constraints: DiscourseGameHistoryConstraint.new
end
