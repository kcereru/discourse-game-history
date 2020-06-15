import { acceptance } from "helpers/qunit-helpers";

acceptance("discourse-game-history", { loggedIn: true });

test("discourse-game-history works", async assert => {
  await visit("/admin/plugins/discourse-game-history");

  assert.ok(false, "it shows the discourse-game-history button");
});
