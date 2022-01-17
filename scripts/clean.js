#!/usr/bin/env node
try {
  const rimraf = require("rimraf");

  rimraf.sync(`${__dirname}/../@dum/*/dist`);
  rimraf.sync(`${__dirname}/../@dum/*/tsconfig.tsbuildinfo`);
  rimraf.sync(`${__dirname}/../@dum/client/.next`);
} catch (e) {
  console.error("Failed to clean up, perhaps rimraf isn't installed?");
  console.error(e);
}
