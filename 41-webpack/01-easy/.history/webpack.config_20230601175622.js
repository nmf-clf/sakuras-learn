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
                use: [path.resolve(__dirname, "loader", "my-loader.js"), "style-loader", "css-loader", "less-loader"],
            },
        ],
    },
};
