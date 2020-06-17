import UserChooser from "select-kit/components/user-chooser";
import { getOwner } from "discourse-common/lib/get-owner";

export default UserChooser.extend({
  classNames: "player-filter-dropdown",

  selectKitOptions: {
    icon: "translate",
    filterable: true,
    showFullTitle: false,
    autoFilterable: false,
  },

  didInsertElement() {
    const controller = getOwner(this).lookup('controller:navigation/category');
    this.set('selectKit.category', controller.get('category.fullSlug'));
  },

  modifyComponentForRow() {
    return "player-filter-row";
  },
});