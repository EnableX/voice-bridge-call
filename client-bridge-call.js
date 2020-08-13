// core modules
const { createServer } = require('http');
// modules installed from npm
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
// application modules
const logger = require('./logger');
const { makeOutboundCall, bridgeCall } = require('./voiceapi');

// Express app setup
const app = express();

let server;
const servicePort = process.env.SERVICE_PORT || 5000;

// shutdown the node server forcefully
function shutdown() {
  server.close(() => {
    logger.info('Shutting down the server');
    process.exit(0);
  });
  setTimeout(() => {
    process.exit(1);
  }, 10000);
}

// Handle onListening event
function onListening() {
  logger.info(`Listening on Port ${servicePort}`);
}

// Handle error generated while creating / starting an http server
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      logger.error(`Port ${servicePort} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`Port ${servicePort} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// create and start an HTTPS node app server
// An SSL Certificate (Self Signed or Registered) is required
function createAppServer() {
  if (process.env.ENABLEX_APP_ID
      && process.env.ENABLEX_APP_KEY
      && process.env.ENABLEX_OUTBOUND_NUMBER) {
    const options = {};

    // Create https express server
    server = createServer(options, app);
    app.set('port', servicePort);
    server.listen(servicePort);
    server.on('error', onError);
    server.on('listening', onListening);
  } else {
    logger.error('Please set env variables - ENABLEX_APP_ID, ENABLEX_APP_KEY, ENABLEX_OUTBOUND_NUMBER');
  }
}

/* Initializing WebServer */
createAppServer();

process.on('SIGINT', () => {
  logger.info('Caught interrupt signal');
  shutdown();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client'));

// outbound voice call
// req contains fromNumber, toNumber
app.post('/outbound-call', (req, res) => {
  /* Initiating Outbound Call */
  makeOutboundCall(req.body, (response) => {
    const msg = JSON.parse(response);
    const callVoiceId = msg.voice_id;
    if (callVoiceId) {
      /* Initiating Bridging Call */
      bridgeCall(callVoiceId, req.body.toNumber, (result) => {
        res.send(JSON.parse(result));
        res.status(200);
      });
    } else {
      res.send(msg);
      res.status(200);
    }
  });
});
