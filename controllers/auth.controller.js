const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');


const register = async (req, res) =>{

    const {username, password, confirmPassword ,email} = req.body;
    try{
        let user = await User.findOne({username});
        if(user){
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe'
            });
        }

        user = new User({ 
            username,
            password,
            email
        });

        user.save();
        return res.status(200).json({
            message: 'Usuario creado correctamente',
            ok: true
        });
    
    }catch(error){
        console.log(error);
    }

    return res.status(200).json({
        message: 'Todo bien',
        ok: true
    })
};

const login = async (req, res) =>{

    const {username, password} = req.body;

    
    try{
        let user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                message: 'El usuario no existe',
                ok: false
            });
        }
        const comparePassword = await user.comparePassword(password);
        if(!comparePassword) return res.status(406).json({message: 'Las credenciales no coinciden', ok: false});
        const token = generateToken(user.username, user._id);

        return res.status(200).json({
            ok: true,
            id : user._id,
            username: user.username,
            email: user.email,
            token
        })

    }catch(error){
        console.log(error);
    }

};


//GET ALL USERS || OBTENER TODOS LOS USUARIOS
 const getUsers = async (req, res) =>{
    /* const users = await User.find({}).populate('networks');
    return res.status(200).json({
        ok: true,
        users
    }) */
    return res.status(200).json({
        ok: true
    })
} 

const getUserByName = async (req, res) =>{
  const username = req.params.username;
  const user = await User.findOne({username}).populate('networks');
  if(!user) return res.status(404).json({message: 'El usuario no existe'});
  return res.status(200).json({
      ok: true,
      userId: user._id,
      username: user.username,
      email: user.email,
      networks: user.networks
  })
}


const validateMyToken = async (req, res)=>{

    const {username, uid }= req;
    let user = await User.findById(uid);
    
    //console.log(username, uid);
    const token = generateToken(username, uid);
    return res.status(200).json({
        ok: true,
        username,
        email: user.email,
        uid,
        token,
        message: 'Token renow'
        })
}

module.exports = {
    getUserByName,
    getUsers,
    login,
    register,
    validateMyToken
}