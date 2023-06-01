#! /usr/bin/env node
console.log("skpack...");

let path = require("path");
let config = require(path.resolve("skpack.config.js"));
console.log("default config url>>", path.resolve("skpack.config.js"));
// 编译器
let Compiler = require("../lib/Compiler");
// console.log('Compiler>>', Compiler);
console.log("config::", config);
let compiler = new Compiler(config);

// 编译
compiler.run();

/* 
    #! /usr/bin/env node
    该代码是一个 Shebang（也称为 Hashbang 或者 Sharpbang），它是一个特殊的注释，用于指定脚本文件的解释器。
    在这个例子中，Shebang 指定了脚本文件的解释器为 Node.js，即 #! /usr/bin/env node。这意味着当你在终端中执行这个脚本文件时，系统会使用 Node.js 解释器来解析并执行该脚本文件。
    Shebang 注释位于脚本文件的第一行，并以 #! 开始，后面跟着解释器的路径和参数（如果需要）。在这个例子中，/usr/bin/env 是一个用于定位系统环境中可执行程序的标准工具，它会自动搜索 PATH 环境变量中指定的目录，找到 node 命令的路径，并将其作为解释器来执行脚本文件。
    Shebang 是一种非常常见的技术，在 Unix 和类 Unix 系统中广泛应用于命令行工具和脚本文件中，它可以让用户无需显式地指定解释器，而直接运行脚本文件。同时，Shebang 也可以指定其他解释器，例如 Python、Ruby 等，以便更方便地执行各种脚本任务。
    需要注意的是，Shebang 只对可执行脚本文件有效，对于其他类型的文件，系统会忽略 Shebang 注释。此外，Shebang 注释必须位于文件的第一行，并且必须与 #! 相邻，否则系统会忽略该注释。
    总之，该代码中的 Shebang 注释指定了脚本文件的解释器为 Node.js，并使得用户可以直接运行脚本文件，而无需显式地指定解释器。这是一种非常常见的技术，在编写命令行工具和脚本文件时经常会使用到。
*/
