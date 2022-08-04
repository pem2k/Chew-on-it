const Post = require ("./post")
const User = require("./user");
const Profile = require("./profile")
const Message = require("./message")

User.hasMany(Post, {
    onDelete:"CASCADE"
})

Post.belongsTo(User)


User.hasOne(Profile)
Profile.belongsTo(User)


User.hasMany(Message)
Message.belongsTo(User)