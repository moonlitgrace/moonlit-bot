import { createNodeMiddleware, createProbot } from "probot";

const app = require("../../../lib/index.js");

module.exports = createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: "/api/github/webhooks",
});
