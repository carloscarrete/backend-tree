const express = require('express');
const app = express();
//Express configuration
require('dotenv').config();
//Database connection
const {dbConnect} = require('./database/connection');
//Initialize database connection
dbConnect();
//Lectura y Parseo del Body
app.use(express.json());

//Rutas
//Auth
app.use('/api/v1/auth', require('./routes/auth.routes'));
//Networks
app.use('/api/v1/networks', require('./routes/network.routes'));

app.get('/', (req, res)=>{
    res.send('Working');
});

app.listen(5000, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});