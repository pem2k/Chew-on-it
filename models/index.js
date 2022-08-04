const User = require("./user");
const Review = require("./review")

const Profile = require("./profile")
const Message = require("./message")

User.hasMany(Review, {
    foreignKey: "user_id"
})

Review.belongsTo(User, {
    foreignKey: "user_id"
})


User.hasOne(Profile,
    {
        foreignKey: "user_id"
})

Profile.belongsTo(User,
    {
        foreignKey: "user_id"
})


User.hasMany(Message,
    {
        foreignKey: "user_id"
})

Message.belongsTo(User,
    {
        foreignKey: "user_id"
})

module.exports = {
    User,
    Review,
    Profile,
    Message,
}