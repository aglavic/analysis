#!/usr/bin/env node

import module_factory from "./refl.js";
const refl_module = await module_factory();

const stdin = process.openStdin();

let data = "";

stdin.on('data', function(chunk) {
  data += chunk;
});

stdin.on('end', async function() {
  const json_data = JSON.parse(data);
  const { depth, sigma, rho, irho, kz } = json_data;
  const R = refl_module.refl(depth, sigma, rho, irho, kz);
  const output = JSON.stringify({ kz, R });
  console.log(output);
});

function magsq(a) {
  return Math.pow(a[0], 2) + Math.pow(a[1], 2);
}
