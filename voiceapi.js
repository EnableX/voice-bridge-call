// core modules
const { request } = require('https');
// modules installed from npm
const btoa = require('btoa');
require('dotenv').config();
// application modules
const logger = require('./logger');

// EnableX server REST API call default options
const httpOptions = {
  host: 'api.enablex.io',
  port: 443,
  headers: {
    Authorization: `Basic ${btoa(`${process.env.ENABLEX_APP_ID}:${process.env.ENABLEX_APP_KEY}`)}`,
    'Content-Type': 'application/json',
  },
};

// To initiate Rest API Call to EnableX Server API
const connectEnablexServer = (data, callback) => {
  logger.info(`REQ URI:- ${httpOptions.method} ${httpOptions.host}:${httpOptions.port}${httpOptions.path}`);
  logger.info(`REQ PARAM:- ${data}`);

  const req = request(httpOptions, (res) => {
    let body = '';
    res.on('data', (response) => {
      body += response;
    });

    res.on('end', () => {
      callback(body);
    });

    res.on('error', (e) => {
      logger.info(`Got error: ${e.message}`);
    });
  });

  if (data == null) {
    req.end();
  } else {
    req.end(data);
  }
};

// Voice API call to make an outbound call
function makeOutboundCall(reqDetails, callback) {
  logger.info(`Initiating a call from ${process.env.ENABLEX_OUTBOUND_NUMBER} to ${reqDetails.fromNumber}`);
  httpOptions.path = '/voice/v1/call';
  httpOptions.method = 'POST';
  const postData = JSON.stringify({
    name: 'TEST_APP',
    owner_ref: 'XYZ',
    from: process.env.ENABLEX_OUTBOUND_NUMBER,
    to: reqDetails.fromNumber,
    action_on_connect: {
      play: {
        text: 'This is the welcome greeting',
        voice: 'Female',
        language: 'en-US',
        prompt_ref: '1',
      },
    },
  });

  connectEnablexServer(postData, (response) => {
    logger.info(`RESPONSE:- ${response}`);
    callback(response);
  });
}

// Voice API calls to bridge two calls
function bridgeCall(voiceId, toNumber, callback) {
  logger.info(`Bridging the call with id ${voiceId} to ${toNumber}`);
  httpOptions.path = `/voice/v1/call/${voiceId}/connect`;
  httpOptions.method = 'PUT';
  const postData = JSON.stringify({
      from: process.env.ENABLEX_OUTBOUND_NUMBER,
      to: toNumber
  });

  connectEnablexServer(postData, (response) => {
    logger.info(`RESPONSE:- ${response}`);
    callback(response);
  });
}

module.exports = {
  makeOutboundCall,
  bridgeCall,
};
