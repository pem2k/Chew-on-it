const sequelize = require("../config/connection");

const {User,Business,Follow,Message,Review,} = require("../models");

const users = [
    {
        first_name:"Ravi",
        last_name:"Nagi",
        full_name: "Ravi Nagi",
        email:"ravi@ravi.ravi",
        password:"password"
    },
    {
        first_name:"Axel",
        last_name:"Kern",
        full_name: "Axel Kern",
        email:"axel@axel.axel",
        password:"password"
    },
    {
        first_name:"Parker",
        last_name:"McKillop",
        full_name: "Parker McKillop",
        email:"parker@parker.parker",
        password:"password"
    },
    {
        first_name:"Chris",
        last_name:"Le",
        full_name: "Chris Le",
        email:"chris@chris.chris",
        password:"password"
    },
    {
        first_name:"John",
        last_name:"Alvarez",
        full_name: "John Alvarez",
        email:"john@john.john",
        password:"password"
    },
    {
        first_name:"Casey",
        last_name:"Sutton",
        full_name: "Casey Sutton",
        email:"casey@casey.casey",
        password:"password"
    },
    {
        first_name:"Dominic",
        last_name:"West",
        full_name: "Dominic West",
        email:"dominic@dominic.dominic",
        password:"password"
    },
    {
        first_name:"Sammy",
        last_name:"Lloyd",
        full_name: "Sammy Lloyd",
        email:"sammy@sammy.sammy",
        password:"password"
    },
    {
        first_name:"Sabrina",
        last_name:"Stevenson",
        full_name: "Sabrina Stevenson",
        email:"sabrina@sabrina.sabrina",
        password:"password"
    },
    {
        first_name:"Brad",
        last_name:"Manning",
        full_name: "Brad Manning",
        email:"brad@brad.brad",
        password:"password"
    },
    {
        first_name:"Gwen",
        last_name:"Vega",
        full_name: "Gwen Vega",
        email:"gwen@gwen.gwen",
        password:"password"
    },
    {
        first_name:"Faye",
        last_name:"Green",
        full_name: "Faye Green",
        email:"faye@faye.faye",
        password:"password"
    },
    {
        first_name:"Veronica",
        last_name:"Caldwell",
        full_name: "Veronica Caldwell",
        email:"veronica@veronica.veronica",
        password:"password"
    },
    {
        first_name:"Michele",
        last_name:"Harrington",
        full_name: "Michele Harrington",
        email:"michele@michele.michele",
        password:"password"
    },
    {
        first_name:"Esther",
        last_name:"Castillo",
        full_name: "Esther Castillo",
        email:"esther@esther.esther",
        password:"password"
    },
    {
        first_name:"Marcia",
        last_name:"Edwards",
        full_name: "Marcia Edwards",
        email:"marcia@marcia.marcia",
        password:"password"
    },
    {
        first_name:"Jaime",
        last_name:"Walters",
        full_name: "Jaime Walters",
        email:"jamie@jamie.jamie",
        password:"password"
    },
    {
        first_name:"Silvia",
        last_name:"Lopez",
        full_name: "Silvia Lopez",
        email:"silvia@silvia.silvia",
        password:"password"
    },
    {
        first_name:"Tonya",
        last_name:"Horton",
        full_name: "Tonya Horton",
        email:"tonya@tonya.tonya",
        password:"password"
    },
    {
        first_name:"Timmy",
        last_name:"Fleming",
        full_name: "Timmy Fleming",
        email:"timmy@timmy.timmy",
        password:"password"
    },
    {
        first_name:"Alton",
        last_name:"Le",
        full_name: "Alton Jones",
        email:"alton@alton.alton",
        password:"password"
    },
    {
        first_name:"Elena",
        last_name:"Stevens",
        full_name: "Elena Stevens",
        email:"elena@elena.elena",
        password:"password"
    },
    {
        first_name:"Maggie",
        last_name:"Lawrence",
        full_name: "Maggie Lawrence",
        email:"maggie@maggie.maggie",
        password:"password"
    },
    {
        first_name:"Don",
        last_name:"Stone",
        full_name: "Don Stone",
        email:"don@don.don",
        password:"password"
    },
    {
        first_name:"Gayle",
        last_name:"Carpenter",
        full_name: "Gayle Carpenter",
        email:"gayle@gayle.gayle",
        password:"password"
    },
    {
        first_name:"Carlton",
        last_name:"Gibbs",
        full_name: "Carlton Gibbs",
        email:"carlton@carlton.carlton",
        password:"password"
    },
    {
        first_name:"Sonja",
        last_name:"Watts",
        full_name: "Sonja Watts",
        email:"sonja@sonja.sonja",
        password:"password"
    },
    {
        first_name:"Lisa",
        last_name:"Foster",
        full_name: "Lisa Foster",
        email:"lisa@lisa.lisa",
        password:"password"
    },
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
    },    
]

const review = [
    {
        content:"Slices were cold but atmosphere is nice",
        review_pic_url:"null",
        business_id:"1",
        user_id:"1",
    },
    {
        content:"Tasty Pizza",
        review_pic_url:"null",
        business_id:"2",
        user_id:"1",
    },
    {
        content:"Perfect place for a quick lunch",
        review_pic_url:"null",
        business_id:"3",
        user_id:"2",
    },
    {
        content:"Nice View",
        review_pic_url:"null",
        business_id:"1",
        user_id:"2",
    },
    {
        content:"Perfect place for a quick lunch",
        review_pic_url:"null",
        business_id:"2",
        user_id:"3",
    },
    {
        content:"The place needs renovation",
        review_pic_url:"null",
        business_id:"3",
        user_id:"3",
    },
    {
        content:"Love this place! Ive been going for years",
        review_pic_url:"null",
        business_id:"1",
        user_id:"4",
    },
    {
        content:"Dont get the calamari",
        review_pic_url:"null",
        business_id:"2",
        user_id:"4",
    },
    {
        content:"The service was terrible! We waited 25 minutes for water!",
        review_pic_url:"null",
        business_id:"3",
        user_id:"5",
    },
    {
        content:"There were cockroaches in the dining area!",
        review_pic_url:"null",
        business_id:"1",
        user_id:"5",
    },
    {
        content:"This place has the best desserts",
        review_pic_url:"null",
        business_id:"2",
        user_id:"6",
    },
    {
        content:"I have a sweet tooth and I LOVE this place!",
        review_pic_url:"null",
        business_id:"3",
        user_id:"6",
    },
    {
        content:"I hate people. this place confirms ny bias.",
        review_pic_url:"null",
        business_id:"1",
        user_id:"7",
    },
    {
        content:"Item 47 on the menu was the best dish I've ever had.",
        review_pic_url:"null",
        business_id:"2",
        user_id:"8",
    },
    {
        content:"I really like the paintings and the general ambience",
        review_pic_url:"null",
        business_id:"3",
        user_id:"9",
    },
    {
        content:"This place has the best variety's of Bubble Tea",
        review_pic_url:"null",
        business_id:"1",
        user_id:"11",
    },
    {
        content:"I love the Tiki Bar. It makes me feel like I'm in the tropics.",
        review_pic_url:"null",
        business_id:"2",
        user_id:"11",
    },
    {
        content:"This place has the best Moscow Mules! cant drink just one!",
        review_pic_url:"null",
        business_id:"3",
        user_id:"11",
    },
    {
        content:"The customer service is terrible. They became angry and rude when I asked why it took 30 minutes to get water!",
        review_pic_url:"null",
        business_id:"1",
        user_id:"13",
    },
    {
        content:"When I returned the Shirt because it was the wrong size they were super nice and exchanged for my correct size.",
        review_pic_url:"null",
        business_id:"2",
        user_id:"14",
    },
    {
        content:"Had a funny mildewy smell. It was kind of stinky.",
        review_pic_url:"null",
        business_id:"3",
        user_id:"15",
    },
    {
        content:"I've been comig here for 20 years for good reason. They are still the best in the Area!",
        review_pic_url:"null",
        business_id:"1",
        user_id:"16",
    },
    {
        content:"There are 2 teenagers running the place. They close early all the time. Hang up on you. Take your business to a place that derserves it.",
        review_pic_url:"null",
        business_id:"2",
        user_id:"17",
    },
    {
        content:"This place makes their noodles fresh daily. You gotta try the Crispy Eggplant",
        review_pic_url:"null",
        business_id:"3",
        user_id:"18",
    },
    {
        content:"The waiter was not very professional. Touched the food on my plate to arrange it when he brought it out",
        review_pic_url:"null",
        business_id:"1",
        user_id:"18",
    },
    {
        content:"I love the sheppard's pie. Goes perfect with the Summer lager they brew.",
        review_pic_url:"null",
        business_id:"2",
        user_id:"18",
    },
    {
        content:"They gave me 200 dollars discount when they botched the reapir on my brakes to make up for the mistake",
        review_pic_url:"null",
        business_id:"3",
        user_id:"18",
    },
    {
        content:"Pay the extra for the VIP experience. its 100% worth it!",
        review_pic_url:"null",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"This place is popping on a Tuesday! Good place to meet new people",
        review_pic_url:"null",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"I really like the wings and the orange and white outfits with the owl theme!",
        review_pic_url:"null",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"This place is the best! where esle can you grab a pint and play pinball?",
        review_pic_url:"null",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"They charged me for a free consultation",
        review_pic_url:"null",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"I had a budget when I arrived and they totally worked with me to get a product that fit my needs and my budget.",
        review_pic_url:"null",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"Found multiple long hairs in our food! it was super gross!",
        review_pic_url:"null",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"They always groom our pests with delicate care. Our two dogs love going!",
        review_pic_url:"null",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"After they mowed our lawn they just dumped the cuttings in our driveway!",
        review_pic_url:"null",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"The mechanic asked me if he could keep the picture of my wife that he found! Dont go here if you have women in your family!",
        review_pic_url:"null",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"When I ordered fries it took a long time and they arrived cold",
        review_pic_url:"null",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"I called ahead to see if they had the item I was looking for, they said they had one left. asked them to hold it. drove 40 minutes to thier location and someone sold the item I asked to be put on hl",
        review_pic_url:"null",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"We went here for our anniversary and they treated us like royalty",
        review_pic_url:"null",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"I really like the outside dining area. nice decor and privacy while still being outside.",
        review_pic_url:"null",
        business_id:"2",
        user_id:"22",
    },    
    {
        content:"All the drinks they serve are super strong here!",
        review_pic_url:"null",
        business_id:"3",
        user_id:"22",
    },    
    {
        content:"Get the Bahn Mi. They use brisket!!",
        review_pic_url:"null",
        business_id:"1",
        user_id:"22",
    },    
    {
        content:"Their frozen lemonade is the best thing on a hot day!",
        review_pic_url:"null",
        business_id:"2",
        user_id:"22",
    },    
    {
        content:"I am allergic to MSG. I asked if they used any. Ended up in the ER!",
        review_pic_url:"null",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"The staff are always friendly and go the extra mile to take care of anything that comes up!",
        review_pic_url:"null",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"The best value for a BBQ plate. beans, slaw, rolls, ribs all for 10 bucks!",
        review_pic_url:"null",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"I took my glasses here to have the lenses replaced. They Lost or stole my glasses!",
        review_pic_url:"null",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"I went in for surgery on my lower back. when I woke up I had a new hip!",
        review_pic_url:"null",
        business_id:"1",
        user_id:"22",
    }
]


const message = [
    {
        message_contents:"Words are here",
        commenter_id:"1",
        review_id:"1",
    },
    {
        message_contents:"Saying Stuff that is important",
        commenter_id:"3",
        review_id:"4",
    },
    {
        message_contents:"Cool Cool Cool",
        commenter_id:"2",
        review_id:"5",
    },
]

const follow = [
    {
        follower_id:2,
        follower_id:3,
        follower_id:4,
        followed_id:1,
        followed_id:2,
        followed_id:3,
        followed_id:4,
        followed_id:5,
        followed_id:6,
        followed_id:7,
        followed_id:8,
        followed_id:9,
        followed_id:10,
        followed_id:11,
        followed_id:12,
        followed_id:13,
        followed_id:14,
        followed_id:15,
        followed_id:16,
        followed_id:17,
        followed_id:18,
        followed_id:19,
        followed_id:20,
        followed_id:21,
        followed_id:22,
        followed_id:23,
        followed_id:24,
        followed_id:25,
        followed_id:26,
        followed_id:27,
        followed_id:28,
    },
    {
        follower_id:6,
        followed_id:12,
    },
    {
        follower_id:3,
        followed_id:9,
    },
    {
        follower_id:15,
        followed_id:16,
    },
    {
        follower_id:20,
        followed_id:25,
    },
    {
        follower_id:8,
        followed_id:16,
    },
    {
        follower_id:3,
        followed_id:1,
    },
]

const seedMe = async ()=>{
    await sequelize.sync({force:true});
    await User.bulkCreate(users,{individualHooks:true})
    await Business.bulkCreate(business)
    await Review.bulkCreate(review)
    await Message.bulkCreate(message)
    await Follow.bulkCreate(follow)
    process.exit(0)
}

seedMe()