import UserRowComponent from "select-kit/components/user-chooser/user-row";
import { default as DiscourseURL } from "discourse/lib/url";
import User from "discourse/models/user";

export default UserRowComponent.extend({
  click(e) {
    User.findByUsername(this.rowValue).then(user => {
      DiscourseURL.redirectTo(
        `/c/${this.selectKit.category}?player=${user.id}`,
        { replaceURL: true }
      );
    })
  }
});
