#!/usr/bin/env node
var argv = require("yargs")
  .usage("Usage: $0 [options]")
  .boolean("b")
  .alias("b", "beta")
  .describe("b", "Get beta releases")
  .help("h")
  .alias("h", "help")
  .argv;

if (! argv.h) {
  require("./lib/main")(argv);
}
