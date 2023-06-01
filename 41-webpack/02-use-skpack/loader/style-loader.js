function loader(sourceCss) {
    return `
        let style = document.createElement("style");
        style.innerHTML = ${JSON.stringify(sourceCss)};
        document.head.appendChild(style);
    `;
}

module.exports = loader;
