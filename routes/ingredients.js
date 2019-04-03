const winston = require('winston');
const config = require('../config/config'); 
const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());


const ingredients = [{id: 1, name: "Red peppers", serving: "mg", facts: {macros: ["carbs", "fats", "proteins"], micros: ['vitmins']}},
{id: 1, name: "Red peppers", serving: "mg", facts: {macros: ["carbs", "fats", "proteins"], micros: ['vitmins']}},
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
    const ingredient = ingredients.find(i => i.id === parseInt(req.param.id));
    if(!ingredient) return res.status(404).send("Ingredient not found...");
    res.send(ingredient);
});