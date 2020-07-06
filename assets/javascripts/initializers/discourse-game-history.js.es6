import { withPluginApi } from "discourse/lib/plugin-api";
import CategoryController from 'discourse/controllers/navigation/category';

function initializeDiscourseGameHistory(api) {
  // https://github.com/discourse/discourse/blob/master/app/assets/javascripts/discourse/lib/plugin-api.js.es6

  api.addDiscoveryQueryParam("player", { replace: true, refreshModel: true });
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
