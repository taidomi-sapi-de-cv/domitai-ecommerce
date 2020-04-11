// Include it and extract some methods for convenience
const fs = require('fs')
const server = require('server');
const { get, post } = server.router;
const { send, render, type } = server.reply;

// Launch server with options and a couple of routes
server({ port: 8081 }, [
  get('/', ctx => type('html').send(fs.readFileSync('tests/server.html'))),
  get('/domitai-ecommerce.min.js', ctx => type('js').send(fs.readFileSync('dist/index.min.js'))),
  post('/', ctx => {
    console.log(ctx.data);
    return 'ok';
  })
]);