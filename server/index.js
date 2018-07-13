const { parse } = require('url');
const next = require('next');
const {
  get,
  post,
  put,
  patch,
  del,
  router,
} = require('microrouter');

const db = require('./db');
const helloRouter = require('./routes/hello');
const todoRouters = require('./routes/todo');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const nextJsRouter = (req, res) => {
  const parsedUrl = parse(req.url, true);
  return handle(req, res, parsedUrl);
};

const setup = async (handler) => {
  await app.prepare();
  await db.connect();
  return handler;
};

module.exports = setup(router(
  get('/hello/:who', helloRouter),
  get('/todos', todoRouters.list),
  post('/todos', todoRouters.create),
  get('/todos/:id', todoRouters.show),
  put('/todos/:id', todoRouters.update),
  patch('/todos/:id', todoRouters.update),
  del('/todos/:id', todoRouters.destory),
  get('/*', nextJsRouter)
));
