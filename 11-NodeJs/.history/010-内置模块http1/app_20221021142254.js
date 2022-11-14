/*
 * @Author: niumengfei
 * @Date: 2022-10-20 15:40:32
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-10-21 14:22:04
 */
const http = require('http');

// console.log(http);

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
});

// Now that server is running
server.listen(1337, '127.0.0.1', () => {
  
   
});