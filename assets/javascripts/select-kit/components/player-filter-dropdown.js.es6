import UserChooser from "select-kit/components/user-chooser";

export default UserChooser.extend({
  classNames: "player-filter-dropdown",

  selectKitOptions: {
    icon: "translate",
    filterable: true,
    showFullTitle: false,
    autoFilterable: false,
  },

//   @on('didReceiveAttrs')
//   setupCategory() {
//     const controller = getOwner(this).lookup('controller:navigation/category');
//     this.set('selectKit.category', controller.get('category'));
//   },

  modifyComponentForRow() {
    return "player-filter-row";
  },
});