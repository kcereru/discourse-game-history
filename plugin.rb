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
        AND '#{query.options[:player].downcase}' = ANY (string_to_array(value, ','))
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

        # clean, downcase + remove empty lines

        usernames.map! {|player| player.tr('@', '').tr(',', '').downcase}
        usernames.reject!(&:blank?)

        # save

        post.topic.custom_fields['players'] = usernames.join(',')
        post.topic.save_custom_fields(true)
      end
    end
  end
end
