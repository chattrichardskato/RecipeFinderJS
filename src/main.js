// src/main.js
// Program entry point. Wires data, search, recursion, formatting and validation together.

const chalk = require("chalk");
const recipes = require("../data/recipes");
const {
  searchByIngredient,
  filterByCuisine,
  maxCookTime,
  findByName,
  getRecipeNames,
  allVegetarian,
  anyQuick,
  buildCuisineIndex
} = require("./search");
const { sumIngredients, countMatchingIngredient, flattenSteps } = require("./recursion");
const { printRecipes, printSummary } = require("./formatter");
const { runSearchSafely, validateMaxTime } = require("./validate");

/**
 * printHeader
 * Prints the program banner.
 */
function printHeader() {
  console.log(chalk.bold.bgCyan.black("\n  RecipeFinderJS  "));
  console.log(chalk.gray(`Loaded ${recipes.length} recipes.\n`));
}

/**
 * demoArrayMethods
 * Demonstrates each ES6 array method against the dataset with visible output.
 */
function demoArrayMethods() {
  printRecipes(searchByIngredient(recipes, "onion"), "Recipes containing onion (filter + some)");
  printRecipes(filterByCuisine(recipes, "Italian"), "Italian recipes (filter)");

  try {
    const quick = maxCookTime(recipes, validateMaxTime(25));
    printRecipes(quick, "Under 25 minutes (filter + validated)");
    printSummary(quick, "Quick list");
  } catch (err) {
    console.log(chalk.red(`  [error] ${err.message}`));
  }

  const found = findByName(recipes, "curry");
  console.log(chalk.bold("\n=== find() result ==="));
  console.log(found ? chalk.green(`Found: ${found.name}`) : chalk.red("No match."));

  console.log(chalk.bold("\n=== map() — all names ==="));
  console.log(getRecipeNames(recipes).join(" | "));

  console.log(chalk.bold("\n=== every() / some() ==="));
  console.log(`All vegetarian? ${allVegetarian(recipes)}`);
  console.log(`Any under 15 min? ${anyQuick(recipes, 15)}`);

  const index = buildCuisineIndex(recipes);
  console.log(chalk.bold("\n=== reduce() — cuisine index ==="));
  Object.entries(index).forEach(([cuisine, list]) => {
    console.log(`  ${cuisine}: ${list.length}`);
  });
}

/**
 * demoRecursion
 * Runs the three recursive helpers and prints their results.
 */
function demoRecursion() {
  console.log(chalk.bold("\n=== Recursion ==="));
  console.log(`Total ingredients across all recipes: ${sumIngredients(recipes)}`);
  console.log(`Recipes containing garlic: ${countMatchingIngredient(recipes, "garlic")}`);
  const nested = ["Boil water.", ["Chop veg.", ["Fry.", "Serve."]], "Enjoy."];
  console.log(`Flattened steps: ${flattenSteps(nested).join(" -> ")}`);
}

/**
 * demoErrorHandling
 * Deliberately triggers validation errors to prove try/catch works.
 */
function demoErrorHandling() {
  console.log(chalk.bold("\n=== Exception handling ==="));
  runSearchSafely(recipes, "a", searchByIngredient); // too short -> RangeError
  runSearchSafely(recipes, 42, searchByIngredient); // wrong type -> TypeError
  try {
    validateMaxTime(-5);
  } catch (err) {
    console.log(`  [error] ${err.name}: ${err.message}`);
  }
}

/**
 * main
 * Orchestrates all demos.
 */
function main() {
  printHeader();
  demoArrayMethods();
  demoRecursion();
  demoErrorHandling();
  console.log(chalk.bold.green("\nDone. Run `npm start` to see it again.\n"));
}

main();