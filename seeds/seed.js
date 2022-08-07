const sequelize = require("../config/connection");

const {User,Business,Follow,Message,Review,} = require("../models");

const users = [
    {
        first_name:"Ravi",
        last_name:"Nagi",
        email:"ravi@ravi.ravi",
        password:"password"
    },
    {
        first_name:"Axel",
        last_name:"Kern",
        email:"axel@axel.axel",
        password:"password"
    },
    {
        first_name:"Parker",
        last_name:"McKillop",
        email:"parker@parker.parker",
        password:"password"
    },
    {
        first_name:"Chris",
        last_name:"Le",
        email:"chris@chris.chris",
        password:"password"
    }
]

const business = [
    {
        business_name:"Papa Johns",
        location:"Capitol Hill,Seattle",
        phone_number:"2069850000",
    },
    {
        business_name:"Pagliacci Pizza",
        location:"First Hill, Seattle",
        phone_number:"2067261717"
    },
    {
        business_name:"Razzi's Pizzeria",
        location:"Denny Park, Seattle",
        phone_number:"2065882425",
    }
]

const review = [
    {
        content:"Slices were cold but atmosphere is nice",
        business_id:"1",
        user_id:"1",
    },
    {
        content:"Tasty Pizza",
        business_id:"2",
        user_id:"1",
    },
    {
        content:"Perfect place for a quick lunch",
        business_id:"3",
        user_id:"2",
    },
    {
        content:"Nice View",
        business_id:"1",
        user_id:"2",
    },
    {
        content:"Perfect place for a quick lunch",
        business_id:"2",
        user_id:"3",
    },
    {
        content:"The place needs renovation",
        business_id:"3",
        user_id:"3",
    },
    {
        content:"Love this place! Ive been going for years",
        business_id:"1",
        user_id:"4",
    },
    {
        content:"Dont get the calamari",
        business_id:"2",
        user_id:"4",
    },
]

// const message = [
//     {
//         message_contents:"Wordsarehere",
//         commenter_id:"1",
//         review_id:"1",
//     },
//     {
//         message_contents:"Saying Stuff thats important",
//         commenter_id:"3",
//         review_id:"4",
//     },
//     {
//         message_contents:"Cool Cool Cool",
//         commenter_id:"2",
//         review_id:"5",
//     },
// ]

const follow = [
    {
        follower_id:"3",
        followed_id:"2",
    },
    {
        follower_id:"3",
        followed_id:"4",
    },
    {
        follower_id:"3",
        followed_id:"1",
    },
]

const seedMe = async ()=>{
    await sequelize.sync({force:true});
    await User.bulkCreate(users,{individualHooks:true})
    await Business.bulkCreate(business)
    await Follow.bulkCreate(follow)
    // await Message.bulkCreate(message)
    await Review.bulkCreate(review)
    process.exit(0)
}

seedMe()