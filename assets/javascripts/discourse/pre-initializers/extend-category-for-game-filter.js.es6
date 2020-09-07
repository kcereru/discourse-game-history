import computed from "ember-addons/ember-computed-decorators";
import Category from "discourse/models/category";

export default {
  name: "extend-category-for-game-filter",

  before: "inject-discourse-objects",

  initialize() {
    Category.reopen({
      @computed("custom_fields.enable_game_filters")
      enable_game_filters: {
        get(enableField) {
          return enableField;
        },
        set(value) {
          this.set("custom_fields.enable_game_filters", value);
          return value;
        }
      }
    });
  }
};
