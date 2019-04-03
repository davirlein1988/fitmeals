const winston = require('winston');
const config = require('./config/config'); 
const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
//require('./startUp/routes')(app);

const restaurants = [
    {id: 1,nit: '2345345-2', name: 'Habitos saludables', address: 'Calle no encontrada'},
    {id: 2,nit: '2345345-2', name: 'Mealprep', address: 'Calle perdida'},
    {id: 3,nit: '2345345-2', name: 'Foodies', address: 'Calle sin nombre'},
    {id: 4,nit: '2345345-2', name: 'Kitchen wizards', address: 'figure it by yourself'},
    {id: 5,nit: '2345345-2', name: 'Walkers eat too', address: 'calle katana'},
    {id: 6,nit: '2345345-2', name: 'El chavo restorant', address: 'la vecindad'},
    {id: 7,nit: '2345345-2', name: 'Los glotones', address: 'st panza'},
    {id: 8,nit: '2345345-2', name: 'Ckicken breast inc', address: 'calle pio pio'},
    {id: 9,nit: '2345345-2', name: 'Let us bulk', address: 'yeah buddy'}
]
app.get('/', (req, res) => {
    res.send("Root of fitmeals api");
});
app.get('/api/restaurants', (req, res)=> {
    res.send(restaurants);
} );
app.get('/api/restaurants/:id', (req, res)=> {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if(!restaurant) return res.status(404).send('The restaurant you were looking for was not found');
    res.send(restaurant);
});

app.post('/api/restaurants', (req, res) => {
    const { error } = validateRestaurant(req.body);    
    if (error) return res.status(400).send(error.details[0].message); 
    
    const restaurant = {
        id: restaurants.length+1,
        nit: req.body.nit,
        name: req.body.name,
        address: req.body.address
    };
    restaurants.push(restaurant);
    res.send(restaurant);
});

app.put('/api/restaurants/:id', (req, res)=> {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if(!restaurant) return res.status(404).send('The restaurant you were looking for was not found');

    const { error } = validateRestaurant(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    restaurant.nit =  req.body.nit;
    restaurant.name = req.body.name;
    restaurant.address = req.body.address;
    res.send(restaurant);
});

app.delete('/api/restaurants/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if(!restaurant) return res.status(404).send('The restaurant you were looking for was not found');

    const index = restaurants.indexOf(restaurant);
    restaurants.splice(index, 1);
    res.send(restaurant);

});

function validateRestaurant(restaurant){
    const schema = {
        nit: Joi.string().min(8).required(),
        name: Joi.string().min(3).required(),
        address: Joi.string().min(10).required() 
    };
    return Joi.validate(restaurant, schema);
}

//ingredients
const ingredients = [{id: 1, name: "Red peppers", serving: "mg", facts: {macros: ["carbs", "fats", "proteins"], micros: ['vitmins']}},
{id: 7, name: "Red peppers", serving: "mg", facts: {macros: ["carbs", "fats", "proteins"], micros: ['vitmins']}},
{id: 2, name: "Black peppers", serving: "gr", facts: {macros: ["carbs", "fats", "proteins"], micros: ['vitmins']}},
{id: 2, name: "Yellow peppers", serving: "gr", facts: {macros: ["carbs", "fats", "proteins"], micros: ['vitmins']}},
{id: 3, name: "Spicy peppers", serving: "lb", facts: {macros: ["carbs", "fats", "proteins"], micros: ['vitmins']}},
{id: 4, name: "Sweet peppers", serving: "pound", facts: {macros: ["carbs", "fats", "proteins"], micros: ['vitmins']}},
{id: 5, name: "Happy peppers", serving: "Kg", facts: {macros: ["carbs", "fats", "proteins"], micros: ['vitmins']}},
{id: 6, name: "Smily peppers", serving: "mg", facts: {macros: ["carbs", "fats", "proteins"], micros: ['vitmins']}}

];

app.get('/api/ingredients', (req, res) => {
    res.send(ingredients);
});
app.get('/api/ingredients/:id',(req, res)=>{
    const ingredient = ingredients.find(i => i.id === parseInt(req.params.id));
    if(!ingredient) return res.status(404).send("Ingredient not found...");
    res.send(ingredient);
});





















const port = config.httpPort;

app.listen(port, ()=> {
    winston.info(`Server listening on port ${port}...`);
});