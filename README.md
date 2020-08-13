# **Basic Client Examples to demonstrate Outbound Calls to bridge two calls using Enablex Voice APIs. **
This example contains instructions how users can initiate Outbound Calls to bridge two calls.

## Prerequisite
- You will need Enablex Application credentials, APP ID and APP KEY.
- You will need a place for hosting this application either cloud or local machine.

## Installation
- `git clone https://github.com/EnableX/voice-bridge-call.git`
- `cd voice-bridge-call`
- `npm install`

## Setting up configurations using environment variables
- Set APP ID and APP KEY. It is required configuration.
  - `export ENABLEX_APP_ID=`
  - `export ENABLEX_APP_KEY=`

## EnableX outbound number https://portal.enablex.io/projects/dashboard/voice/phone-numbers/
- Use any outbound number you have setup. Set without (+). Example - 3197010240003
  - `export ENABLEX_OUTBOUND_NUMBER=`

- Set port. Default port is set to 5000. It is an optional configuration.
  - `export SERVICE_PORT=`

## Starting the client application script
- To start the service,
  - `node client-bridge-call.js`
