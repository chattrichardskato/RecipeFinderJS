// src/main.js
// Program entry point. Wires data, search, recursion, formatting and validation together.
// Every demo is wrapped in try/catch so an on-screen error proves requirement #5.

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
const { runSearchSafely, parseRecipeQuery, validateMaxTime } = require("./validate");

/**
 * printHeader
 * Prints the program banner and recipe count.
 */
function printHeader() {
  console.log(chalk.bold.bgCyan.black("\n  RecipeFinderJS  "));
  console.log(chalk.gray(`Loaded ${recipes.length} recipes.\n`));
}

/**
 * demoArrayMethods
 * Demonstrates all seven ES6 array methods with visible on-screen output:
 * filter, some (via searchByIngredient), map, find, every, some, reduce, forEach (via printRecipes).
 */
function demoArrayMethods() {
  // filter + some
  printRecipes(searchByIngredient(recipes, "onion"), "filter + some -> onion recipes");

  // filter
  printRecipes(filterByCuisine(recipes, "Italian"), "filter -> Italian recipes");

  // filter + validated max time
  try {
    const quick = maxCookTime(recipes, validateMaxTime(25));
    printRecipes(quick, "filter + validate -> under 25 minutes");
    printSummary(quick, "Quick list");
  } catch (err) {
    console.log(chalk.red(`  [caught] ${err.name}: ${err.message}`));
  }

  // find
  const found = findByName(recipes, "curry");
  console.log(chalk.bold("\n=== find() ==="));
  console.log(found ? chalk.green(`Found: ${found.name}`) : chalk.red("No match."));

  // map
  console.log(chalk.bold("\n=== map() -> names ==="));
  console.log(getRecipeNames(recipes).join(" | "));

  // every
  console.log(chalk.bold("\n=== every() -> all vegetarian? ==="));
  console.log(chalk.yellow(String(allVegetarian(recipes))));

  // some
  console.log(chalk.bold("\n=== some() -> any under 15 minutes? ==="));
  console.log(chalk.yellow(String(anyQuick(recipes, 15))));

  // reduce
  const index = buildCuisineIndex(recipes);
  console.log(chalk.bold("\n=== reduce() -> cuisine index ==="));
  Object.entries(index).forEach(([cuisine, list]) => {
    console.log(`  ${cuisine}: ${list.length}`);
  });
}

/**
 * demoRecursion
 * Runs the recursive helpers and prints their results.
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
 * Deliberately triggers each type of validation error so the try/catch path
 * prints a visible [caught] message for every failure mode.
 */
function demoErrorHandling() {
  console.log(chalk.bold("\n=== Exception handling (throw + try/catch) ==="));

  // RangeError: too short
  runSearchSafely(recipes, "a", searchByIngredient);

  // TypeError: wrong type
  runSearchSafely(recipes, 42, searchByIngredient);

  // RangeError: non-positive time
  try {
    validateMaxTime(-5);
  } catch (err) {
    console.log(`  [caught] ${err.name}: ${err.message}`);
  }

  // SyntaxError: unknown query key
  try {
    parseRecipeQuery("cuisine:italian, spice:hot");
  } catch (err) {
    console.log(`  [caught] ${err.name}: ${err.message}`);
  }

  // Success case: a well-formed query
  try {
    const q = parseRecipeQuery("cuisine:italian, maxTime:40");
    console.log(chalk.green(`  parsed query -> ${JSON.stringify(q)}`));
  } catch (err) {
    console.log(`  [caught] ${err.name}: ${err.message}`);
  }
}

/**
 * main
 * Runs every demo. Wrapped in try/catch so an unexpected error prints instead
 * of crashing with a raw stack trace.
 */
function main() {
  try {
    printHeader();
    demoArrayMethods();
    demoRecursion();
    demoErrorHandling();
    console.log(chalk.bold.green("\nDone. Run `npm start` again to repeat.\n"));
  } catch (err) {
    console.log(chalk.red(`[fatal] ${err.name}: ${err.message}`));
    process.exitCode = 1;
  }
}

main();