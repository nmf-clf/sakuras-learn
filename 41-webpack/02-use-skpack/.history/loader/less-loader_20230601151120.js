const less = require("less");

function loader(source) { // source - less 文件的内容
    let css = '';
    less.render(source, (err, res) => { // less.render() - 将 less 转换为 css
        css = res.css;
    });
    console.log('ssss', css);
    css = css.replace(/\n/g, "\\n"); // 处理换行符 
    console.log('ddddd',css);
    debugger
    return css;
}

module.exports = loader;
