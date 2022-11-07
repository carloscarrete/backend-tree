const SocialNetwork = require("../models/SocialNetwork");
const User = require("../models/User");


const getSocialNetworks = async (req, res) => {
    let socialNetworks = await SocialNetwork.find({});
    return res.status(200).json({
        ok: true,
        socialNetworks
    });
}

const getSocialNetwork = async (req, res) => {
    const {username} = req.params;
    const socialNetworkUser = await User.findOne({username}).populate('networks');
    if(!socialNetworkUser) return res.status(404).json({ok: false, message: `El usuario no existe`});
    return res.status(200).json({
        ok: true,
        username,
        networks: socialNetworkUser.networks
    })
}

const deleteSocialNetwork = async (req, res) => {
    const { id: socialNetworkId } = req.params;
    
    try {
        const socalNetwork = await SocialNetwork.findById(socialNetworkId);
        if (!socalNetwork) throw new Error('La red social no existe');
        if (socalNetwork.user.toString() !== req.uid)  throw new Error('No tienes permisos para eliminar esta red social');
        await SocialNetwork.findByIdAndDelete(socialNetworkId);
        res.status(200).json({
            message: 'Red social eliminada correctamente',
            ok: true
        })
    } catch (error) {
        console.log(error.message);
    } 
}

const createSocialNetwork = async (req, res) => {
    const {uid:userId }= req;
    const {name, url} = req.body;
    try {
        let user = await User.findOne({ _id: userId }).populate('networks');
        if (user.networks.find(network => network.name === name)) throw new Error(`La red social ${name} ya ha sido registrada`);
        user = await User.findOne({ _id: userId });
        let socialNetwork = new SocialNetwork({
            name,
            url,
            user: user._id
        });
        const savedSocialNetwork = await socialNetwork.save();
        user.networks = user.networks.concat(savedSocialNetwork._id);
        await user.save();
        return res.status(200).json({
            message: 'Red social agreada correctamente',
            name, 
            url,
            ok: true
        });
    } catch (error) {
        console.log(error.message);
    } 
}

const updateSocialNetwork = async (req, res) => {
    const { id: socialNetworkId } = req.params;
    const { name, url } = req.body;
    try {
        const socialNetwork = await SocialNetwork.findById(socialNetworkId);
        if (!socialNetwork) throw new Error('La red social no existe');
        if (socialNetwork.user.toString() !== req.uid)  throw new Error('No tienes permisos para actualizar esta red social');
        socialNetwork.name = name;
        socialNetwork.url = url;
        await socialNetwork.save();
        res.status(200).json({
            message: 'Red social actualizada correctamente',
            ok: true
        });
    } catch (error) {
        console.log(error.message);
    } 
}


module.exports = {
    createSocialNetwork,
    deleteSocialNetwork,
    getSocialNetworks,
    updateSocialNetwork,
    getSocialNetwork
}