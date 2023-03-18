import express from "express";
import bodyParser from "body-parser";// lay tham so clien toi server
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';

import connectDB from './config/connectDB';
import cors from 'cors';
require('dotenv').config();

let app = express();
app.use(cors({ origin: true }));
//app.use(cors({ credentials: true, origin: true }));
//config app
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
viewEngine(app);
initWebRoutes(app);



connectDB();
let port = process.env.PORT || 8080;
// port == undefined => port 6969 8080

app.listen(port, () => {
    //callbank
    console.log("back end nodejs is running : " + port)
})
