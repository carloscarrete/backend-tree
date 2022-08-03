const jwt = require('jsonwebtoken');

const generateToken = ( username, uid ) => {

    const payload = {username, uid};

    try{
        const token = jwt.sign( payload , process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return token;
    }catch(error){
        console.log(error);
    }

};

module.exports = { generateToken };