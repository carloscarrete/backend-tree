const {Schema, model} = require('mongoose');

const SocialNetwork = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String, 
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = model('SocialNetwork', SocialNetwork);