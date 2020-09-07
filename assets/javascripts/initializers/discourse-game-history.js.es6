import { withPluginApi } from "discourse/lib/plugin-api";
import CategoryController from 'discourse/controllers/navigation/category';
import Category from "discourse/models/category";

function initializeDiscourseGameHistory(api) {
  // https://github.com/discourse/discourse/blob/master/app/assets/javascripts/discourse/lib/plugin-api.js.es6

  api.addDiscoveryQueryParam("player", { replace: true, refreshModel: true });
  api.registerConnectorClass('discovery-list-container-top', 'player-filter', {
    shouldRender(args, component) {
      const controller = Discourse.__container__.lookup("controller:navigation/category");

      // using a painfully roundabout way of getting hold of the category setting from both category and tag screen

      var slugPathWithId      = controller.target.currentRoute.params.category_slug_path_with_id;
      var enable_game_filters = slugPathWithId ? Category.findBySlugPathWithID(slugPathWithId).enable_game_filters : controller.get('category.enable_game_filters');

      return enable_game_filters
    }
  });
}

export default {
  name: "discourse-game-history",

  initialize() {
    withPluginApi("0.8.31", initializeDiscourseGameHistory);
    CategoryController.reopen({
      queryParams: ['player'],
      player: null
    });
}
};
