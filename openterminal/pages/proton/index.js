const httpProxy = require('http-proxy');

export default async function Loadrepos(req, res) {
    var proxy = httpProxy.createServer({
        target:'http://localhost:9005'
    });
    proxy.listen(6969);
}