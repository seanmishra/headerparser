let http = require('http')

let app = http.createServer((request, response) => {

    let data = {
        'ipaddress' : getIP(request),
        'language' : getLang(request),
        'software' : getOS(request)
    }
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(data))
})

var getIP = (request) => {
    let ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || ''
    ip = (ip.split(':').reverse())[0]
    return ip
}

var getLang = (request) => {
    let lang = request.headers['accept-language'] || ''
    lang = lang.split(',')[0]
    return lang
}

var getOS = (request) => {
    let userAgent = request.headers['user-agent'] || ''
    let OS = (/\((.*)\)/).exec(userAgent)[1]
    return OS
}

app.listen(1337, () => {console.log('Listening on port 1337')})