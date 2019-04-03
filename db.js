const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/fitmeals')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const restaurantSchema = new mongoose.Schema({
    nit: { type: Number, required: true},
    name: {type: String, required: true},
    details: [String],
    address: {type: String, required: true},
    date: { type: Date, default: Date.now},
    isAccepted: Boolean
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

async function createRestaurant(){
    const restaurant = new Restaurant({
        nit: 23453566,
        name: "Homers Donut's truck",
        address: "Calle sanch panza 123",
        details: ["something", "we", "will", "add later"],
        isAccepted: false
    });
    try {
        const result = await restaurant.save();
    } catch (e) {
        console.error(e.message);
    }
}

async function getRestaurants(){
    const restaurants = await Restaurant.find()
    .limit(10)
    .sort({name: 1})
    .select({name: 1, details: 1});
    console.log(restaurants);
}

async function updateRestaurant(id){
    //const restaurant = await Restaurant.findById(id); Retrieving object first, then update
    //update directly in DB
    const result = await Restaurant.update({_id: id}, {
        $set:{
            name: 'The buggy man food truck!!!',
            address: 'The hungriest eat the most here ave'
        }
    });
    /*if(!restaurant) return;
        restaurant.set({
            isAccepted: true,
            address: "I could not find it last time"
        });
        const result = await restaurant.save(); first method */
    console.log(result);

}

async function deleteRestaurant(id){
   const result = await Restaurant.deleteOne({ _id: id});
   console.log(result);
}

createRestaurant();
//getRestaurants();
//updateRestaurant('5ca40f3318b87f7cc098d86c');
//deleteRestaurant('5ca40f3318b87f7cc098d86c');