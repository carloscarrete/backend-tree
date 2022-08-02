const mongoose = require('mongoose');

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.URL_MONGO);
        console.log('Database connected');
    }catch(error){
        console.log(error);
    }
}

module.exports = {dbConnect};