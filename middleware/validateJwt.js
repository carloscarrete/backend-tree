const jwt = require('jsonwebtoken');

const validateToken = (req, res, next)=>{
    try{
        let token = req.headers?.authorization;
        if(!token) if (!token) throw new Error('No token provided');
        token = token.split(' ')[1];
        
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        req.uid = payload.user._id;
        req.username = payload.user.username;
        next();

    }catch(error){
        const manageError = {
            ['invalid token']: 'Token invalido',
            ['jwt malformed']: 'Token malformado',
            ['jwt expired']: 'Token expirado',
            ['invalid signature']: 'Firma invalida',
            ['No Bearer']: 'Utiliza formato Bearer'
        }
        return res.status(404).json({
            message: manageError[error.message] || 'Error desconocido'
        })
    }
}


module.exports = {validateToken};