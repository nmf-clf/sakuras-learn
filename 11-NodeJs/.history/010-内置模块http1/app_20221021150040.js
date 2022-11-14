/*
 * @Author: niumengfei
 * @Date: 2022-10-20 15:40:32
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-10-21 15:00:40
 */
const http = require('http');

// console.log(http);

const server = http.createServer((req, res) => {
    console.log(req.url, req.url=== '/favicon.ico');
    if(req.url === '/favicon.ico') return; //待处理
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.write('1233');
    // res.write(JSON.stringify([777,8,9]))
    res.end(JSON.stringify({
        status: '1',
        resbody: [1,2,443],
        errmsg: '',
    }));
    // res.write('sadasdd') //不能再res.write()之后写res.end()
});

// Now that server is running
server.listen(9000, () => {
  console.log('server is runing at localhost:9000');
});