import UserRowComponent from "select-kit/components/user-chooser/user-row";
import { default as DiscourseURL } from "discourse/lib/url";

export default UserRowComponent.extend({
  click(e) {
    DiscourseURL.routeTo(`/c/${this.selectKit.category}?player=${this.item.id}`);
  }
});
