// src/recursion.js
// REQUIREMENT: "Recursion (a function that calls itself, with a clear base case)".

/**
 * sumIngredients
 * Recursively sums the number of ingredients across a list of recipes.
 * Base case: empty list -> 0.
 * @param {Array<object>} recipes
 * @returns {number}
 */
function sumIngredients(recipes) {
  // Base case: nothing left to count.
  if (recipes.length === 0) return 0;

  const [first, ...rest] = recipes;
  return first.ingredients.length + sumIngredients(rest);
}

/**
 * countMatchingIngredient
 * Recursively counts how many recipes contain a given ingredient.
 * Base case: empty list -> 0.
 * @param {Array<object>} recipes
 * @param {string} ingredient
 * @returns {number}
 */
function countMatchingIngredient(recipes, ingredient) {
  if (recipes.length === 0) return 0;

  const [first, ...rest] = recipes;
  const needle = ingredient.toLowerCase();
  const hit = first.ingredients.some((i) => i.toLowerCase() === needle) ? 1 : 0;

  return hit + countMatchingIngredient(rest, ingredient);
}

/**
 * flattenSteps
 * Recursively flattens a nested steps structure into a single array of strings.
 * Base case: a non-array input is returned as a one-item array.
 * @param {Array<any>|string} steps
 * @returns {Array<string>}
 */
function flattenSteps(steps) {
  if (!Array.isArray(steps)) return [steps];

  return steps.reduce((acc, item) => acc.concat(flattenSteps(item)), []);
}

module.exports = { sumIngredients, countMatchingIngredient, flattenSteps };