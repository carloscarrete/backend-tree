const bcrypt = require('bcryptjs');
const {Schema, model} = require('mongoose');

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    profileBackgroundPicture: {
        required: true,
        type: String,
    },
    biography: {
        type: String,
        maxLength: 255,
    },
    createdAt: {
        type: Date,
    },
    networks:[
        {type: Schema.Types.ObjectId,
        ref: 'SocialNetwork'
    }
    ]
});

User.pre('save', async function(next){

    const user = this;

    if(!user.isModified('password')) return next
    try{
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    }catch(error){
        console.log(error);
    }
});

User.methods.comparePassword = async function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = model('User', User);