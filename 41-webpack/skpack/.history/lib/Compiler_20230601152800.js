let path = require("path");
let fs = require("fs");
let babylon = require("babylon"); // 将源码转换成 AST
let traverse = require("@babel/traverse").default; // 对 AST 进行遍历
let types = require("@babel/types"); // AST 节点类型
let generator = require("@babel/generator").default; // 将 AST 转换成源码
let ejs = require("ejs"); // 模板引擎
// 编译器
class Compiler {
    constructor(options) {
        // webpack配置
        const { entry, output } = options;
        this.config = options;
        // 入口
        this.entry = entry;
        // 出口
        this.output = output;
        // 模块
        this.modules = [];
        // 当前目录
        this.root = process.cwd(); // 返回 Node.js 进程的当前工作目录
        // 入口文件的路径
        this.entryId;
        // console.log('constructor>>>', this);s
    }
    // 获取文件内容
    getSource(modulePath) {
        let rules = this.config?.module.rules || []; // 1. 获取所有的规则
        let content = fs.readFileSync(modulePath, "utf8"); // 2. 读取模块内容
        // console.log('content>>', content);
        for(let i=0; i<rules.length; i++){ // 3. 遍历所有的规则
            let rule = rules[i];
            let {test, use} = rule;
            let len = use.length - 1; // 从后往前执行
            if(test.test(modulePath)){ // 需要转换
                function normalLoader() { // 递归调用
                    let _l = use[len--];
                    console.log('处理loader>>>', _l);
                    let loader = require(_l); // 获取 loader
                    content = loader(content); // 执行 loader
                    console.log('loader转换结果>>>', content);
                    if(len >= 0){ // 还有 loader
                        normalLoader(); // 递归调用
                    }
                }
                normalLoader(); // 开始执行
            }
        }
        return content;
    }
    // 解析源码
    parse(source, parentPath) {
        console.log("父级节点>>>", parentPath);
        // 1. 将源码转换成 AST
        let ast;
        try{
            ast = babylon.parse(source);
        }catch(err){
            console.log('sss', err);
        }
        // 2. 遍历 AST
        let dependencies = []; // 依赖列表
        traverse(ast, {
            // traverse - 遍历 AST
            CallExpression(p) {
                // CallExpression - 遍历所有的函数调用
                let node = p.node; // 对应的节点
                if (node.callee.name === "require") {
                    node.callee.name = "__webpack_require__"; // 替换 require 为 __webpack_require__
                    let moduleName = node.arguments[0].value; // 模块的引用名字
                    moduleName = moduleName + (path.extname(moduleName) ? "" : ".js"); // 模块的引用名字 + 扩展名
                    moduleName = "./" + path.join(parentPath, moduleName); // 模块的引用名字 + 扩展名 + 父级目录
                    dependencies.push(moduleName); // 依赖列表
                    node.arguments = [types.stringLiteral(moduleName)]; // 将更新后的子模块依赖名写回去 types.stringLiteral - 创建一个字符串文字节点
                }
            },
        });
        // 3. 将 AST 转换成源码
        let sourceCode = generator(ast).code;
        console.log("解析后源码>>", sourceCode);
        console.log("依赖列表>>", dependencies);
        return {
            sourceCode,
            dependencies,
        };
    }
    // 构建模块 - modulePath: 模块绝对路径 - isEntry: 是否是入口文件
    buildModule(modulePath, isEntry) {
        console.log("----------------------------------------------------");
        console.log("构建模块>>>", modulePath);
        // 1. 读取代码内容
        let source = this.getSource(modulePath);
        // 2. 获取模块相对路径
        let moduleName = "./" + path.relative(this.root, modulePath); // 获取相对路径的目的是为了在后面的递归加载依赖模块时，需要获取依赖模块的绝对路径
        console.log("模块名(相对路径)::", moduleName); // ./src/index.js
        if (isEntry) {
            this.entryId = moduleName; // 保存入口的名字
        }
        // 3. 解析需要把 source 源码进行改造，返回一个依赖列表 - dependencies: 依赖列表通常是相对路径
        let { sourceCode, dependencies } = this.parse(
            source,
            path.dirname(moduleName)
        );
        // 4. 把相对路径和模块中的内容对应起来
        this.modules[moduleName] = sourceCode;
        // 5. 递归加载依赖模块
        dependencies.forEach((dep) => {
            // 依赖模块的递归加载 - 需要获取依赖模块的绝对路径
            this.buildModule(path.join(this.root, dep), false);
        });
    }
    // 打包文件
    emitFile() {
        // 1. 获取文件内容
        let main = this.getSource(path.resolve(__dirname, "bundle.ejs"));
        // 2. 模板渲染
        let code = ejs.render(main, {
            entryId: this.entryId,
            modules: this.modules,
        });
        // 3. 输出到哪个目录下
        let mainPath = path.join(this.output.path, this.output.filename);
        // console.log("输出模板渲染后内容>>>", code);
        // 4. 写入文件
        // this.assets = {}; // 作用是为了在后面的 emit 钩子中使用
        // this.assets[main] = code; // 作用是为了在后面的 emit 钩子中使用
        // fs.writeFileSync(main, this.assets[main]); // 为什么 this.assets[main] 不直接用 code 代替，因为在后面的 emit 钩子中需要使用 this.assets[main]
        fs.writeFileSync(mainPath, code);
    }
    // 构建启动
    run() {
        // 开始构建 - 从入口开始 - 拿到入口文件的绝对路径
        this.buildModule(path.resolve(this.root, this.entry), true);
        // 打包文件
        this.emitFile();
    }
}

module.exports = Compiler;
