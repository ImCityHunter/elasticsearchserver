const express = require('express');
const app = express();
const start = require('./start.js');


app.use(function (req,res, next) {
    var allowedOrigins = ['http://localhost:3000', '*'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials',
        'true');
    next();
});

// build backend and update data in elasitc search
start();

// enable the controller
const controller = require('./controllers/controller.server.js');
controller(app);

// start up the port at 4200
const PORT = process.env.PORT || 4200;
app.listen(PORT, ()=>{
    console.log(`process is listening on port: ${PORT}`);
})
