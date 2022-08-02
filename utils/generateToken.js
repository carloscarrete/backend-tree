const jwt = require('jsonwebtoken');

const generateToken = ( user ) => {

    try{
        const token = jwt.sign({user}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return token;
    }catch(error){
        console.log(error);
    }

};

module.exports = { generateToken };