import express from 'express'
import yargs from 'yargs-parser'
import fs from 'fs'
import https from 'https'

interface Args {
    cert?: string
    key?: string
    port: number
    index?: string
    root?: string
    httpsPort?: number
    onlyHttps?: boolean
    httpRedirect?: string
}

const _args: any = yargs(process.argv.slice(2))
const args: Args = _args

if (!args.port) {
    console.error('no port specified')
    process.exit(0)
}

const app = express()

app.use('/', express.static(`${process.cwd()}${args.root ? `/${args.root}` : ''}`))

if (args.index) {
    app.get('/', (req, res) => {
        res.end(fs.readFileSync(`${process.cwd()}${args.root ? `/${args.root}` : ''}/${args.index}`))
    })
}

if (!args.onlyHttps && !args.httpRedirect) {
    app.listen(args.port)
    console.log(`hosting http server on port ${args.port}`)
}

if (!args.onlyHttps && args.httpRedirect) {
    const reapp = express()
    reapp.get('*', (req, res) => {
        res.redirect(args.httpRedirect ?? '')
    })
    reapp.listen(args.port)
    console.log(`hosting http server (for redirecting) on port ${args.port}`)
}

if (!args.httpsPort) {
    console.error('no https port specified when running both')
}

if (args.cert && args.key && (args.onlyHttps || args.httpsPort)) {
    const httpsApp = https.createServer({
        cert: fs.readFileSync(args.cert),
        key: fs.readFileSync(args.key)
    }, app)

    httpsApp.listen(args.httpsPort ?? args.port)
    console.log(`hosting https server on port ${args.httpsPort ?? args.port}`)

    if (!args.httpRedirect) {
        console.warn('You are using this in https only mode without a redirect to https! use "--httpRedirect <https url>" to redirect to https')
    }
}