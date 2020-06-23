# frozen_string_literal: true

# name: discourse-game-history
# about: A Discourse plugin for Mafia451 that allows users to filter completed games by various game features.
# version: 0.1
# authors: KC Maddever (kcereru)
# url: https://github.com/kcereru/discourse-game-history

register_asset 'stylesheets/common/discourse-game-history.scss'
register_asset 'stylesheets/desktop/discourse-game-history.scss', :desktop
register_asset 'stylesheets/mobile/discourse-game-history.scss', :mobile

enabled_site_setting :discourse_game_history_enabled

PLUGIN_NAME ||= 'DiscourseGameHistory'

load File.expand_path('lib/discourse-game-history/engine.rb', __dir__)

after_initialize do
  ::TopicQuery.add_custom_filter(:player) do |topics, query|
    if query.options[:player]
      topics.where("topics.id in (
        SELECT topic_id FROM topic_custom_fields
        WHERE name = 'players'
        AND '#{query.options[:player].to_i}' = ANY (string_to_array(value, ',')::int[])
      )")
    else
      topics
    end
  end

  # https://github.com/discourse/discourse/blob/master/lib/plugin/instance.rb
  on(:post_edited) do |post|
    if post.is_first_post?

      html  = post.cooked
      doc   = Nokogiri::HTML.parse(html)

      alive_elements  = doc.xpath("//div[@class='alive']")

      if(alive_elements.last)

        stripped  = ActionController::Base.helpers.strip_tags(alive_elements.last.text)
        usernames = stripped.split("\n")

        # clean + remove empty lines

        usernames.map! {|player| player.tr('@', '')}
        usernames.reject!(&:blank?)

        # convert to ids, ignore invalid users

        players     = usernames.map { |username| User.find_by_username_lower(username.downcase) }.compact
        player_ids  = players.map { |user| user.id }

        # save

        post.topic.custom_fields['players'] = player_ids.join(',')
        post.topic.save_custom_fields(true)
      end
    end
  end
end
