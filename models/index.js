const Post = require ("./post")
const User = require("./user");
const Profile = require("./profile")

User.hasMany(Post, {
    onDelete:"CASCADE"
})

Post.belongsTo(User)

User.hasOne(Profile)
Profile.belongsTo(User)


