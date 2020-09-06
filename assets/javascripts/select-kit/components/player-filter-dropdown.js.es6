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

    // target.url works on both category and tag page, but includes query param so remove separately

    var fullUrl = controller.get('target.url')
    var url     = fullUrl.split('?')[0]

    this.set('selectKit.url', url);
  },

  modifyComponentForRow() {
    return "player-filter-row";
  },
});
