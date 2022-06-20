const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
const router = require('./src/routes/router');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', router);
app.listen(45204,()=>{});