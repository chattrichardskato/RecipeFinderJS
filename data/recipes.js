// data/recipes.js
// Static recipe dataset used as the data source for all array-method operations.
// Keeping it in-code makes the project runnable with no API key or network call.

const recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    cuisine: "Italian",
    minutes: 45,
    servings: 4,
    vegetarian: false,
    ingredients: ["spaghetti", "beef mince", "tomato", "onion", "garlic"],
    steps: ["Brown the mince.", "Add onion and garlic.", "Add tomato and simmer.", "Cook pasta and combine."]
  },
  {
    id: 2,
    name: "Chickpea Curry",
    cuisine: "Indian",
    minutes: 30,
    servings: 3,
    vegetarian: true,
    ingredients: ["chickpeas", "coconut milk", "curry powder", "onion", "spinach"],
    steps: ["Soften onion.", "Add spices.", "Add chickpeas and coconut milk.", "Simmer and stir in spinach."]
  },
  {
    id: 3,
    name: "Beef Tacos",
    cuisine: "Mexican",
    minutes: 25,
    servings: 4,
    vegetarian: false,
    ingredients: ["tortillas", "beef mince", "cheese", "lettuce", "salsa"],
    steps: ["Cook beef with spices.", "Warm tortillas.", "Assemble with toppings."]
  },
  {
    id: 4,
    name: "Vegetable Stir Fry",
    cuisine: "Chinese",
    minutes: 20,
    servings: 2,
    vegetarian: true,
    ingredients: ["broccoli", "carrot", "soy sauce", "ginger", "rice"],
    steps: ["Cook rice.", "Stir fry vegetables.", "Add sauce and serve."]
  },
  {
    id: 5,
    name: "Greek Salad",
    cuisine: "Greek",
    minutes: 10,
    servings: 2,
    vegetarian: true,
    ingredients: ["cucumber", "tomato", "feta", "olives", "olive oil"],
    steps: ["Chop vegetables.", "Combine with feta and olives.", "Dress with olive oil."]
  },
  {
    id: 6,
    name: "Chicken Alfredo",
    cuisine: "Italian",
    minutes: 35,
    servings: 4,
    vegetarian: false,
    ingredients: ["fettuccine", "chicken breast", "cream", "parmesan", "garlic"],
    steps: ["Cook pasta.", "Sear chicken.", "Make cream sauce.", "Combine."]
  },
  {
    id: 7,
    name: "Lentil Soup",
    cuisine: "Mediterranean",
    minutes: 40,
    servings: 4,
    vegetarian: true,
    ingredients: ["lentils", "carrot", "celery", "onion", "stock"],
    steps: ["Sauté vegetables.", "Add lentils and stock.", "Simmer until tender."]
  }
];

module.exports = recipes;