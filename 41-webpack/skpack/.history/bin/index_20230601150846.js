#! /usr/bin/env node
console.log("skpack...");

let path = require("path");
let config = require(path.resolve("skpack.config.js"));
console.log('default config url>>', path.resolve("skpack.config.js"));
// 编译器
let Compiler = require("../lib/Compiler");
// console.log('Compiler>>', Compiler);
console.log('config::', config);
let compiler = new Compiler(config);

// 编译
compiler.run();
