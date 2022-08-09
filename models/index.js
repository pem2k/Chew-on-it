const User = require("./user");
const Review = require("./review")
const Business = require("./business")
const Message = require("./message")
const Follow = require("./follower")

User.hasMany(Review, {
    foreignKey: "user_id"
})
Review.belongsTo(User, {
    foreignKey: "user_id"
})

// User.hasMany(Message, {
//     foreignKey: "user_id"
// })
//Message.belongsTo(User, {
//     foreignKey: "user_id"
// })


Business.hasMany(Review, {
    foreignKey: "business_id",
    })
Review.belongsTo(Business, {
	foreignKey: "business_id"
})


Review.hasMany(Message), {
    foreignKey: "user_id"
}

//followers
User.belongsToMany(User, { as: 'follower', foreignKey: 'follower_id', through: 'Follow' });
User.belongsToMany(User, { as: 'followed', foreignKey: 'followed_id', through: 'Follow' });

module.exports = {
    User,
    Review,
    Business,
    Message,
    Follow
}