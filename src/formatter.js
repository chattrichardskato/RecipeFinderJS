// src/formatter.js
// Handles all on-screen output. Uses the third-party `chalk` library for colour.
// REQUIREMENT: "Output displayed on screen" + "Library written by someone else".

const chalk = require("chalk");

/**
 * formatRecipe
 * Turns one recipe object into a coloured, multi-line string.
 * @param {object} recipe
 * @returns {string}
 */
function formatRecipe(recipe) {
  const vegTag = recipe.vegetarian ? chalk.green("[veg]") : chalk.red("[meat]");
  const header = chalk.bold.cyan(`${recipe.name} ${vegTag}`);
  const meta = chalk.gray(
    `${recipe.cuisine} • ${recipe.minutes} min • serves ${recipe.servings}`
  );
  const ingredients = chalk.yellow(
    `  Ingredients: ${recipe.ingredients.join(", ")}`
  );
  return `\n${header}\n${meta}\n${ingredients}`;
}

/**
 * printRecipes
 * Renders a list of recipes to the terminal, with a heading and a fallback message.
 * @param {Array<object>} list
 * @param {string} title
 */
function printRecipes(list, title) {
  console.log(chalk.bold.magenta(`\n=== ${title} ===`));
  if (!list || list.length === 0) {
    console.log(chalk.red("No recipes matched your criteria."));
    return;
  }
  // REQUIREMENT: forEach array method
  list.forEach((recipe) => console.log(formatRecipe(recipe)));
}

/**
 * printSummary
 * Prints a short summary line for any collection of recipes.
 * @param {Array<object>} list
 * @param {string} label
 */
function printSummary(list, label) {
  const totalMinutes = list.reduce((sum, r) => sum + r.minutes, 0);
  console.log(
    chalk.bold(`\n${label}: ${list.length} recipe(s), ${totalMinutes} total minutes.`)
  );
}

module.exports = { formatRecipe, printRecipes, printSummary };