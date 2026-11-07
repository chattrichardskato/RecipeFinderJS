// src/search.js
// All query operations over the recipe dataset.
// REQUIREMENT: "Native ES6 array functions (map, filter, reduce, find, some, every, forEach)".

/**
 * searchByIngredient
 * Returns recipes whose ingredient list contains the given ingredient (case-insensitive).
 * Uses filter + some.
 * @param {Array<object>} recipes
 * @param {string} ingredient
 * @returns {Array<object>}
 */
function searchByIngredient(recipes, ingredient) {
  const needle = ingredient.toLowerCase();
  return recipes.filter((r) =>
    r.ingredients.some((ing) => ing.toLowerCase().includes(needle))
  );
}

/**
 * filterByCuisine
 * Returns recipes matching a cuisine name.
 * Uses filter.
 * @param {Array<object>} recipes
 * @param {string} cuisine
 * @returns {Array<object>}
 */
function filterByCuisine(recipes, cuisine) {
  const needle = cuisine.toLowerCase();
  return recipes.filter((r) => r.cuisine.toLowerCase() === needle);
}

/**
 * maxCookTime
 * Returns only recipes under a given number of minutes.
 * Uses filter.
 * @param {Array<object>} recipes
 * @param {number} minutes
 * @returns {Array<object>}
 */
function maxCookTime(recipes, minutes) {
  return recipes.filter((r) => r.minutes <= minutes);
}

/**
 * findByName
 * Returns the first recipe whose name matches the query (case-insensitive).
 * Uses find.
 * @param {Array<object>} recipes
 * @param {string} name
 * @returns {object|undefined}
 */
function findByName(recipes, name) {
  const needle = name.toLowerCase();
  return recipes.find((r) => r.name.toLowerCase().includes(needle));
}

/**
 * getRecipeNames
 * Maps a recipe list to just its names.
 * Uses map.
 * @param {Array<object>} recipes
 * @returns {Array<string>}
 */
function getRecipeNames(recipes) {
  return recipes.map((r) => r.name);
}

/**
 * allVegetarian
 * Checks whether every recipe in the list is vegetarian.
 * Uses every.
 * @param {Array<object>} recipes
 * @returns {boolean}
 */
function allVegetarian(recipes) {
  return recipes.every((r) => r.vegetarian === true);
}

/**
 * anyQuick
 * Checks whether at least one recipe is under the given time.
 * Uses some.
 * @param {Array<object>} recipes
 * @param {number} minutes
 * @returns {boolean}
 */
function anyQuick(recipes, minutes) {
  return recipes.some((r) => r.minutes < minutes);
}

/**
 * buildCuisineIndex
 * Groups recipes by cuisine into an object of arrays.
 * Uses reduce.
 * @param {Array<object>} recipes
 * @returns {Object<string, Array<object>>}
 */
function buildCuisineIndex(recipes) {
  return recipes.reduce((index, recipe) => {
    const key = recipe.cuisine;
    if (!index[key]) index[key] = [];
    index[key].push(recipe);
    return index;
  }, {});
}

module.exports = {
  searchByIngredient,
  filterByCuisine,
  maxCookTime,
  findByName,
  getRecipeNames,
  allVegetarian,
  anyQuick,
  buildCuisineIndex
};