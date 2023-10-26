# EnableX Programmable Voice API: Initiating Outbound Calls to Bridge Two Calls
This example contains instructions how users can initiate Outbound Calls to bridge two calls.


## Pre-requisite
- You will need Enablex Application credentials, APP ID and APP KEY. To find credentials, register with EnableX (https://portal.enablex.io/cpaas/trial-sign-up/).
- You will need a place for hosting this application either cloud or local machine.


## Installation
- `git clone https://github.com/EnableX/voice-bridge-call.git`
- `cd voice-bridge-call`
- `npm install`


## Setting up configurations using environment variables

Mac/Linux

- Set APP ID and APP KEY. It is required configuration.
  - `export ENABLEX_APP_ID=`
  - `export ENABLEX_APP_KEY=`

Windows

- Make a file with name ".env" in root directory . And copy content of .env.example in .env file . Then set the environment   variables manually in .env file. And below are the environment variables.
  - `ENABLEX_APP_ID`, `ENABLEX_APP_KEY`


## EnableX outbound number https://portal.enablex.io/projects/dashboard/voice/phone-numbers/

Mac/Linux
- Use any outbound number you have setup. Set without (+). Example - 3197010240003
  - `export ENABLEX_OUTBOUND_NUMBER=`

- Set port. Default port is set to 5000. It is an optional configuration.
  - `export SERVICE_PORT=`
- Set to run the service on http / https (false / true)
  - `export LISTEN_SSL=`

Windows

- In that .env file set these variables `SERVICE_PORT`, `LISTEN_SSL` and ` ENABLEX_OUTBOUND_NUMBER`.


## SSL Certificate (Self Signed or Registered). It is required configuration if LISTEN_SSL is set to true.

Mac/Linux

  - Make a directory called certs on the root of the project
    - `mkdir certs`
  - Change to certs directory
    - `cd certs`
  - Create and Install certificates
    - `sudo openssl req -nodes -new -x509   -keyout example.key -out example.crt   -days 365   -subj '/CN=example.com/O=My Company Name LTD./C=US'; cat example.crt > example.ca-bundle`
  - use the certificate .key [self signed or registered]
    - `export CERTIFICATE_SSL_KEY=`
  - use the certificate .crt [self signed or registered]
    - `export CERTIFICATE_SSL_CERT=`
  - use the certificate CA[chain] [self signed or registered]
    - `export CERTIFICATE_SSL_CACERTS=`
  - switch to the root of the project
    - `cd ..`

Windows (Use Git Bash)

   - Make a directory called certs on the root of the project
    - `mkdir certs`
  - Change to certs directory
    - `cd certs`
  - Create and Install certificates
    - `openssl req -nodes -new -x509   -keyout example.key -out example.crt   -days 365`   
    - `cat example.crt > example.ca-bundle`
  - In .env file update these variables if you have changed the path of key, crt and ca-bundle files `CERTIFICATE_SSL_KEY`, `CERTIFICATE_SSL_CERT` and ` CERTIFICATE_SSL_CACERTS`, else ignore this step.
  - switch to the root of the project
    - `cd ..`


## Starting the client application script
- To start the service,
  - `node client-bridge-call.js`
