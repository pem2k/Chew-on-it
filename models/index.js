const User = require("./user");
const Review = require("./review")
const Business = require("./business")
const Message = require("./message")
const Follow = require("./follower")

User.hasMany(Review, {
    reference:Review,
    foreignKey: "user_id"
})

User.hasMany(Message, {
    foreignKey: "user_id"
})

User.hasMany(Follow, {
    foreignKey: "user_id"
})

Follow.hasMany(User, {
    foreignKey: "user_id"
})

Business.hasMany(Review, { 
    foreignKey: "business_id"
    })
    

Message.belongsTo(User, {
        foreignKey: "user_id"
})

module.exports = {
    User,
    Review,
    Business,
    Message,
    Follow
}