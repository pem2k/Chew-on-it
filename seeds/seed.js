const sequelize = require("../config/connection");

const {User,Business,Follow,Message,Review,} = require("../models");

const users = [
    {
        first_name:"Ravi",
        last_name:"Nagi",
        full_name: "Ravi Nagi",
        email:"ravi@ravi.ravi",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_001.jpg"
    },
    {
        first_name:"Axel",
        last_name:"Kern",
        full_name: "Axel Kern",
        email:"axel@axel.axel",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_003.jpg"
    },
    {
        first_name:"Parker",
        last_name:"McKillop",
        full_name: "Parker McKillop",
        email:"parker@parker.parker",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_005.jpg"
    },
    {
        first_name:"Chris",
        last_name:"Le",
        full_name: "Chris Le",
        email:"chris@chris.chris",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_010.jpg"
    },
    {
        first_name:"John",
        last_name:"Alvarez",
        full_name: "John Alvarez",
        email:"john@john.john",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_006.jpg"
    },
    {
        first_name:"Casey",
        last_name:"Sutton",
        full_name: "Casey Sutton",
        email:"casey@casey.casey",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_002.jpg"
    },
    {
        first_name:"Dominic",
        last_name:"West",
        full_name: "Dominic West",
        email:"dominic@dominic.dominic",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_004.jpg"
    },
    {
        first_name:"Sammy",
        last_name:"Lloyd",
        full_name: "Sammy Lloyd",
        email:"sammy@sammy.sammy",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_011.jpg"
    },
    {
        first_name:"Sabrina",
        last_name:"Stevenson",
        full_name: "Sabrina Stevenson",
        email:"sabrina@sabrina.sabrina",
        password:"password"
		,
		profile_pic_url: "/img/profiles/profile_pic_009.jpg"
    },
    {
        first_name:"Brad",
        last_name:"Manning",
        full_name: "Brad Manning",
        email:"brad@brad.brad",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_010.jpg"
    },
    {
        first_name:"Gwen",
        last_name:"Vega",
        full_name: "Gwen Vega",
        email:"gwen@gwen.gwen",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_008.jpg"
    },
    {
        first_name:"Faye",
        last_name:"Green",
        full_name: "Faye Green",
        email:"faye@faye.faye",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_001.jpg"
    },
    {
        first_name:"Veronica",
        last_name:"Caldwell",
        full_name: "Veronica Caldwell",
        email:"veronica@veronica.veronica",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_003.jpg"
    },
    {
        first_name:"Michele",
        last_name:"Harrington",
        full_name: "Michele Harrington",
        email:"michele@michele.michele",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_007.jpg"
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
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_002.jpg"
    },
    {
        first_name:"Jaime",
        last_name:"Walters",
        full_name: "Jaime Walters",
        email:"jamie@jamie.jamie",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_005.jpg"
    },
    {
        first_name:"Silvia",
        last_name:"Lopez",
        full_name: "Silvia Lopez",
        email:"silvia@silvia.silvia",
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_010.jpg"
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
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_004.jpg"
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
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_008.jpg"
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
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_009.jpg"
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
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_011.jpg"
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
        password:"password",
		profile_pic_url: "/img/profiles/profile_pic_006.jpg"
    },
]

const business = [
    {
        business_name:"Papa Johns",
        location:"5401c 25th Ave NE Ste C, Seattle, WA 98105",
        phone_number:"2069850000",
    },
    {
        business_name:"Pagliacci Pizza",
        location:"2400 10th Ave E, Seattle, WA 98102",
        phone_number:"2067261717"
    },
    {
        business_name:"Razzi's Pizzeria",
        location:"1314 Howell St, Seattle, WA 98101",
        phone_number:"2065882425",
    },
]

const review = [
    {
        content:"Slices were cold but atmosphere is nice",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"1",
    },
    {
        content:"Tasty Pizza",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"1",
    },
    {
        content:"Perfect place for a quick lunch",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"2",
    },
    {
        content:"Nice View",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"2",
    },
    {
        content:"Perfect place for a quick lunch",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"3",
    },
    {
        content:"The place needs renovation",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"3",
    },
    {
        content:"Love this place! Ive been going for years",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"4",
    },
    {
        content:"Dont get the calamari",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"4",
    },
    {
        content:"The service was terrible! We waited 25 minutes for water!",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"5",
    },
    {
        content:"There were cockroaches in the dining area!",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"5",
    },
    {
        content:"This place has the best desserts",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"6",
    },
    {
        content:"I have a sweet tooth and I LOVE this place!",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"6",
    },
    {
        content:"I hate people. this place confirms ny bias.",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"7",
    },
    {
        content:"Item 47 on the menu was the best dish I've ever had.",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"8",
    },
    {
        content:"I really like the paintings and the general ambience",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"9",
    },
    {
        content:"This place has the best variety's of Bubble Tea",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"11",
    },
    {
        content:"I love the Tiki Bar. It makes me feel like I'm in the tropics.",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"11",
    },
    {
        content:"This place has the best Moscow Mules! cant drink just one!",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"11",
    },
    {
        content:"The customer service is terrible. They became angry and rude when I asked why it took 30 minutes to get water!",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"13",
    },
    {
        content:"When I returned the Shirt because it was the wrong size they were super nice and exchanged for my correct size.",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"14",
    },
    {
        content:"Had a funny mildewy smell. It was kind of stinky.",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"15",
    },
    {
        content:"I've been comig here for 20 years for good reason. They are still the best in the Area!",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"16",
    },
    {
        content:"There are 2 teenagers running the place. They close early all the time. Hang up on you. Take your business to a place that derserves it.",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"17",
    },
    {
        content:"This place makes their noodles fresh daily. You gotta try the Crispy Eggplant",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"18",
    },
    {
        content:"The waiter was not very professional. Touched the food on my plate to arrange it when he brought it out",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"18",
    },
    {
        content:"I love the sheppard's pie. Goes perfect with the Summer lager they brew.",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"18",
    },
    {
        content:"They gave me 200 dollars discount when they botched the reapir on my brakes to make up for the mistake",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"18",
    },
    {
        content:"Pay the extra for the VIP experience. its 100% worth it!",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"This place is popping on a Tuesday! Good place to meet new people",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"I really like the wings and the orange and white outfits with the owl theme!",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"This place is the best! where esle can you grab a pint and play pinball?",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"They charged me for a free consultation",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"I had a budget when I arrived and they totally worked with me to get a product that fit my needs and my budget.",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"Found multiple long hairs in our food! it was super gross!",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"They always groom our pests with delicate care. Our two dogs love going!",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"After they mowed our lawn they just dumped the cuttings in our driveway!",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"The mechanic asked me if he could keep the picture of my wife that he found! Dont go here if you have women in your family!",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"When I ordered fries it took a long time and they arrived cold",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"I called ahead to see if they had the item I was looking for, they said they had one left. asked them to hold it. drove 40 minutes to thier location and someone sold the item I asked to be put on hl",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"We went here for our anniversary and they treated us like royalty",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"I really like the outside dining area. nice decor and privacy while still being outside.",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"All the drinks they serve are super strong here!",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"Get the Bahn Mi. They use brisket!!",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"Their frozen lemonade is the best thing on a hot day!",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"I am allergic to MSG. I asked if they used any. Ended up in the ER!",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"The staff are always friendly and go the extra mile to take care of anything that comes up!",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
        business_id:"1",
        user_id:"22",
    },
    {
        content:"The best value for a BBQ plate. beans, slaw, rolls, ribs all for 10 bucks!",
        restaurant_name: "Pagliacci Pizza",
        restaurant_address: "2400 10th Ave E, Seattle, WA 98102",
        business_id:"2",
        user_id:"22",
    },
    {
        content:"I took my glasses here to have the lenses replaced. They Lost or stole my glasses!",
        restaurant_name: "Razzi's Pizzeria",
        restaurant_address: "1314 Howell St, Seattle, WA 98101",
        business_id:"3",
        user_id:"22",
    },
    {
        content:"I went in for surgery on my lower back. when I woke up I had a new hip!",
        restaurant_name: "Papa Johns",
        restaurant_address: "5401c 25th Ave NE Ste C, Seattle, WA 98105",
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
    {
        follower_id:11,
        followed_id:1,
    },
    {
        follower_id:10,
        followed_id:1,
    },
    {
        follower_id:9,
        followed_id:1,
    },
    {
        follower_id:8,
        followed_id:1,
    },
    {
        follower_id:7,
        followed_id:1,
    },
    {
        follower_id:6,
        followed_id:1,
    },
    {
        follower_id:4,
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