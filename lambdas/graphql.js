const { createLambdaServer } = require("./server/apollo-server");

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const server = await createLambdaServer(event, context);

  return new Promise((res, rej) => {
    const cb = (err, args) => (err ? rej(err) : res(args));
    server.createHandler()(event, context, cb);
  });
};
