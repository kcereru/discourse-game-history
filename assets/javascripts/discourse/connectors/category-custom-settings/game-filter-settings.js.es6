export default {
  actions: {
    onChangeSetting(value) {
      this.set(
        "category.custom_fields.enable_game_filters",
        value ? "true" : "false"
      );
    }
  }
};
