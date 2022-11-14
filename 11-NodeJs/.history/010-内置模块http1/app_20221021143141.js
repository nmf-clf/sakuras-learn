/*
 * @Author: niumengfei
 * @Date: 2022-10-20 15:40:32
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-10-21 14:31:41
 */
const http = require('http');

// console.log(http);

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.write('1233');
    // res.write('sadasdd')
    // res.write(JSON.stringify([777,8,9]))
    res.end(JSON.stringify({
        status: '1',
        resbody: [1,2,3],
        errmsg: '',
    }));
});

// Now that server is running
server.listen(9000, () => {
  console.log('server is runing at localhost:9000');
});