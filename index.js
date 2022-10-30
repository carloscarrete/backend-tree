const express = require('express');
const cors = require('cors');
const app = express();
//Express configuration
require('dotenv').config();
//Database connection
const {dbConnect} = require('./database/connection');
//Initialize database connection
dbConnect();
//Lectura y Parseo del Body
app.use(express.json());

app.use(cors());
//Rutas

//Auth
app.use('/api/v1/auth', require('./routes/auth.routes'));
//Networks
app.use('/api/v1/networks', require('./routes/network.routes'));

app.get('/', (req, res)=>{
    res.send('Working');
    console.log('Working');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});
