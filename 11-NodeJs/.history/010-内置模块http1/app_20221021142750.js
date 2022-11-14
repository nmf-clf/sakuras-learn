/*
 * @Author: niumengfei
 * @Date: 2022-10-20 15:40:32
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-10-21 14:27:33
 */
const http = require('http');

// console.log(http);

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
});

// Now that server is running
// server.listen(3100)

server.listen(3100, () => {
  console.log('server is runing at localhost:6666');
});