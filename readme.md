## A quick hosting package

```bash
npm i -g quickhost
```

```bash
quickhost --port <your port>
```

## Features
- https support
- auto https redirects
- index file overrides
- root path overrides

## Arguments

### `--port <port>`
sets the port of the http server

### `--httpsPort <port>`
sets the port of the https server

### `--cert <ABSOLUTE path to cert file>` (https only)
sets the ABSOLUTE path to the certificate file

### `--key <ABSOLUTE path to private key file>` (https only)
sets the ABSOLUTE path to the private key file

### `--httpRedirect <target url>`
replaces the http server with a server which redirects all users to the specified url

### `--onlyHttps true`
disables the http server. This does NOT disable the redirect server!

### `--root <RELATIVE path to webroot directory>`
sets the root directory of the web serever.

**This is RELATIVE to the current woring directory!**

### `--index <RELATIVE path from webroot to index.html>`
set the file to get send on "/".

**This is RELATIVE to the webroot directory specified with `--root` or the current working directory!**

## Additional Info
This package uses express and https. It starts a http1.1 server (http2 support coming soon).