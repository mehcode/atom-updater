#!/usr/bin/env node
var main = require("./lib/main"),
  argv = require("yargs").argv;

if (argv.h || argv.help) {
  console.log("usage: atom-updater [-h|--help] [-b|--beta]");
  console.log("    -h, --help: show this help");
  console.log("    -b, --beta: use beta channel");
} else if(argv.b || argv.beta) {
  main(true);
} else {
  main();
}
