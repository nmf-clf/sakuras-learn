// 编译器
class Compiler {
    constructor(options) {
        // webpack配置
        const { entry, output } = options;
        // 入口
        this.entry = entry;
        // 出口
        this.output = output;
        // 模块
        this.modules = [];
        // 当前目录
        this.root = process.cwd(); // 返回 Node.js 进程的当前工作目录。
    }
    buildModule() {
        console.log("buildModule...");
    }
    // 构建启动
    run() {
        // 开始构建
        this.buildModule();
    }

}

module.exports = Compiler;
