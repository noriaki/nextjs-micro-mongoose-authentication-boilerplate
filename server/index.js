const { parse } = require('url');
const next = require('next');
const { get, router } = require('microrouter');

const helloRouter = require('./routes/hello');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const nextJsRouter = (req, res) => {
  const parsedUrl = parse(req.url, true);
  return handle(req, res, parsedUrl);
};

const setup = async (handler) => {
  await app.prepare();
  return handler;
};

module.exports = setup(router(
  get('/hello/:who', helloRouter),
  get('/*', nextJsRouter)
));
