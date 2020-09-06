import UserRowComponent from "select-kit/components/user-chooser/user-row";
import { default as DiscourseURL } from "discourse/lib/url";
import User from "discourse/models/user";

export default UserRowComponent.extend({
  click(e) {
    this.selectKit.select(this.rowValue, this.item);
    DiscourseURL.redirectTo(
      `${this.selectKit.url}?player=${this.rowValue}`,
      { replaceURL: true }
    );
  },
});
