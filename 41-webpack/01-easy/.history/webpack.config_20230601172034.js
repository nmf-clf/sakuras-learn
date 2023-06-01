const path = require("path");
console.log("路径::", path.resolve(__dirname, "dist"));
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", path.resolve(__dirname, "loader", "less-loader.js")],
            },
        ],
    },
};
