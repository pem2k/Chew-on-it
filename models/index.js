const User = require("./user");
const Review = require("./review")
const Profile = require("./profile")
const Message = require("./message")
const Follower = require("./follower")
const Following = require("./following")
const Business = require("./business")


User.hasMany(Review, {
    foreignKey: "user_id"
})

User.hasMany(Follower, {
    foreignKey: "user_id",
})
Follower.belongsTo(User, {
    foreignKey: "user_id"
})


User.hasMany(Following, {
    foreignKey: "user_id"
})
Following.belongsTo(User, {
    foreignKey: "user_id"
})


User.hasMany(Message, {
    foreignKey: "user_id"
})

Message.hasMany(User, {
    foreignKey: "user_id"
})

Message.belongsTo(User,
    {
        foreignKey: "user_id"
})

Business.hasMany(Review, {
    foreignKey: "user_id"
})

// User.hasOne(Profile,
//     {
//         foreignKey: "user_id"
// })
// Profile.belongsTo(User,
//     {
//         foreignKey: "user_id"
// })

module.exports = {
    User,
    Review,
    Profile,
    Message,
    Follower,
    Following,
    Business,
}