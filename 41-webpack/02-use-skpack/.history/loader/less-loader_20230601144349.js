const less = require("less");

function loader(source) {
    let css;
    less.render(source, (err, res) => {
        css = res.css;
    });
    css = css.replace(/\n/g, "\\n");
    return css;
}
