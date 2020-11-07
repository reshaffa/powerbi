require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/api/v1/',routes);
app.listen(
    process.env.APP_PORT, () => {
        console.log(`Server start at port : ${process.env.APP_PORT}`)
    }
);