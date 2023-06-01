function loader(sourceCss) {
    // let css = sourceCss.replace(/\n/g, "\\n"); // 处理换行符
    return `
        let style = document.createElement("style");
        style.innerHTML = ${JSON.stringify(css)};
        document.head.appendChild(style);
    `;
}

module.exports = loader;
