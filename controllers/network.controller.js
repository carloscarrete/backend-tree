const SocialNetwork = require("../models/SocialNetwork");
const User = require("../models/User");


const getSocialNetworks = async (req, res) => {
    let socialNetworks = await SocialNetwork.find({});
    return res.status(200).json({
        ok: true,
        socialNetworks
    });
}

const createSocialNetwork = async (req, res) => {
    const { name, url, userId } = req.body;
    //let socialNetwork = await SocialNetwork.findOne({ name });
    let user = await User.findOne({ _id: userId }).populate('networks');
    if(user.networks.find(network => network.name === name)){
        return res.status(400).json({
            message: `La red social ${name} ya ha sido registrada`
        });
    }
         try {
            user = await User.findOne({ _id: userId });
            let socialNetwork = new SocialNetwork({
                name,
                url,
                user: user._id
            });
            const savedSocialNetwork = await socialNetwork.save();
            console.log(socialNetwork);
            user.networks = user.networks.concat(savedSocialNetwork._id);
            await user.save();
            return res.status(200).json({
                message: 'Red social agreada correctamente',
                ok: true
            });
        } catch (error) {
            console.log(error);
        } 

}


module.exports = {
    getSocialNetworks,
    createSocialNetwork
}