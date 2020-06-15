export default function() {
  this.route("discourse-game-history", function() {
    this.route("actions", function() {
      this.route("show", { path: "/:id" });
    });
  });
};
