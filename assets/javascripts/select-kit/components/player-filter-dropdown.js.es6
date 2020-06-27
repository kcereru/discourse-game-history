import UserChooser from "select-kit/components/user-chooser";
import { getOwner } from "discourse-common/lib/get-owner";
import { computed } from "@ember/object";

export default UserChooser.extend({
  classNames: "player-filter-dropdown",
  value: computed("filtered_player", {
    get() {
      const controller = getOwner(this).lookup('controller:navigation/category');
      return [controller.target.currentRoute.queryParams.player];
    }
  }),

  didInsertElement() {
    const controller = getOwner(this).lookup('controller:navigation/category');
    this.set('selectKit.category', controller.get('category.fullSlug'));
  },

  modifyComponentForRow() {
    return "player-filter-row";
  },
});