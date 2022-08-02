const SocialNetwork = require("../models/SocialNetwork");
const User = require("../models/User");


const getSocialNetworks = (req, res) => {
    res.json({
        notes: [
            {
                id: 1,
                title: 'Note 1',
                body: 'This is the body of note 1'
            }
        ]
    })
}

const createSocialNetwork = async (req, res) => {
    const { name, url, userId } = req.body;
    try {
        let socialNetwork = await SocialNetwork.findOne({ name });
        let user = await User.findOne({ _id: userId });
        if (socialNetwork) {
            return res.status(400).json({
                message: 'La red social ya existe'
            });
        }
        socialNetwork = new SocialNetwork({
            name,
            url,
            user: user._id
        });
        const savedSocialNetwork = await socialNetwork.save();
        console.log(socialNetwork);
        user.networks = user.networks.concat(savedSocialNetwork._id);
        await user.save();
        return res.status(200).json({
            message: 'Red social creada correctamente',
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