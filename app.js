require('babel/register')({
    only: [
        /node_modules\/mozaik[^/]*\/src/,
        /src\/server\.js/,
        /config\.js/
    ]
});

var mozaik = require('./src/server');