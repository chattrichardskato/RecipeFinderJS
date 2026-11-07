// test.js
// Quick smoke test for Node installation and module wiring.
const { searchByIngredient } = require("./src/search");
const recipes = require("./data/recipes");

const hits = searchByIngredient(recipes, "garlic");
console.log(`Node is working! Found ${hits.length} garlic recipes.`);