const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');


const register = async (req, res) => {

    const profilePicture = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    const profileBackgroundPicture = 'https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_960_720.png';
    const biography = '';

    const { username, password, confirmPassword, email } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe'
            });
        }

        user = new User({
            biography,
            email,
            password,
            profileBackgroundPicture,
            profilePicture,
            username,
        });

        user.save();
        return res.status(200).json({
            message: 'Usuario creado correctamente',
            ok: true
        });

    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({
        message: 'Todo bien',
        ok: true
    })
};

const login = async (req, res) => {

    const { username, password } = req.body;


    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: 'El usuario no existe',
                ok: false
            });
        }
        const comparePassword = await user.comparePassword(password);
        if (!comparePassword) return res.status(406).json({ message: 'Las credenciales no coinciden', ok: false });
        const token = generateToken(user.username, user._id);

        return res.status(200).json({
            ok: true,
            id: user._id,
            username: user.username,
            email: user.email,
            token
        })

    } catch (error) {
        console.log(error);
    }

};


//GET ALL USERS || OBTENER TODOS LOS USUARIOS
const getUsers = async (req, res) => {
    /* const users = await User.find({}).populate('networks');
    return res.status(200).json({
        ok: true,
        users
    }) */
    return res.status(200).json({
        ok: true
    })
}

const getUserByName = async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username }).populate('networks');
    if (!user) return res.status(404).json({ message: 'El usuario no existe' });
    return res.status(200).json({
        ok: true,
        userId: user._id,
        username: user.username,
        email: user.email,
        networks: user.networks,
        profilePicture: user.profilePicture,
        profileBackgroundPicture: user.profileBackgroundPicture,
        biography: user.biography
    })
}

const updateProfilePicture = async (req, res) => {
    const uid = req.uid;

    let user = await User.findById(uid);

    if (!user) return res.status(404).json({ ok: false, message: 'El usuario no existe' });

    if (user._id.toString() !== uid) {
        return res.status(404).json({
            ok: false,
            message: 'No tienes privilegios para realizar esta acción'
        });
    }


    const update = {
        ...req.body,
    }

    const updatePP = await User.findByIdAndUpdate(uid, update, { new: true });

    return res.json({
        ok: true,
        profilePicture: updatePP
    })

}

const updateProfileBackgroundPicture = async (req, res) => {
    const uid = req.uid;

    let user = await User.findById(uid);

    if (!user) return res.status(404).json({ ok: false, message: 'El usuario no existe' });

    if (user._id.toString() !== uid) {
        return res.status(404).json({
            ok: false,
            message: 'No tienes privilegios para realizar esta acción'
        });
    }

    const update = {
        ...req.body
    }

    const updateBc = await User.findByIdAndUpdate(uid, update, { new: true });

    return res.json({
        ok: true,
        profilePicture: updateBc
    })
}

const updateProfileBiography = async (req, res) => {
    const uid = req.uid;

    let user = await User.findById(uid);

    if (!user) return res.status(404).json({ ok: false, message: 'El usuario no existe' });

    if (user._id.toString() !== uid) {
        return res.status(404).json({
            ok: false,
            message: 'No tienes privilegios para realizar esta acción'
        });
    }

    const update = {
        ...req.body
    }

    const updateBc = await User.findByIdAndUpdate(uid, update, { new: true });

    return res.json({
        ok: true,
        profilePicture: updateBc
    })
}


const validateMyToken = async (req, res) => {

    const { username, uid } = req;
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
    updateProfileBackgroundPicture,
    updateProfileBiography,
    updateProfilePicture,
    validateMyToken
}