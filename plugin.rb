# frozen_string_literal: true

# name: discourse-game-history
# about: A Discourse plugin for Mafia451 that allows users to filter completed games by various game features.
# version: 0.1
# authors: kcereru
# url: https://github.com/kcereru

register_asset 'stylesheets/common/discourse-game-history.scss'
register_asset 'stylesheets/desktop/discourse-game-history.scss', :desktop
register_asset 'stylesheets/mobile/discourse-game-history.scss', :mobile

enabled_site_setting :discourse_game_history_enabled

PLUGIN_NAME ||= 'DiscourseGameHistory'

load File.expand_path('lib/discourse-game-history/engine.rb', __dir__)

after_initialize do
  # https://github.com/discourse/discourse/blob/master/lib/plugin/instance.rb
end
