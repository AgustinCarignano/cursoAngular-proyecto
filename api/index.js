const jsonServer = require("json-server");
const auth = require("json-server-auth");
// const dirname = require("__dirname");

const app = jsonServer.create();
const router = jsonServer.router("api/db.json");
const rules = auth.rewriter({
  // Permission rules
  users: 660,
  students: 660,
  // Other rules
});

// /!\ Bind the router db to the app
app.db = router.db;

// You must apply the auth middleware before the router
app.use(rules);
app.use(auth);
app.use(router);
app.listen(3000);
