// src/validate.js
// REQUIREMENT: "Exceptions (throw plus try/catch)".

/**
 * validateSearchInput
 * Ensures a search term is a non-empty string of at least 2 characters.
 * Throws a descriptive Error otherwise.
 * @param {string} term
 * @returns {string} trimmed, lowercased term
 */
function validateSearchInput(term) {
  if (typeof term !== "string") {
    throw new TypeError(`Search term must be a string, received ${typeof term}.`);
  }
  const trimmed = term.trim();
  if (trimmed.length < 2) {
    throw new RangeError("Search term must be at least 2 characters long.");
  }
  return trimmed.toLowerCase();
}

/**
 * validateMaxTime
 * Ensures a max-cook-time is a positive finite number.
 * Throws if invalid.
 * @param {number} minutes
 * @returns {number}
 */
function validateMaxTime(minutes) {
  if (typeof minutes !== "number" || Number.isNaN(minutes)) {
    throw new TypeError("Max cook time must be a number.");
  }
  if (minutes <= 0) {
    throw new RangeError("Max cook time must be greater than zero.");
  }
  return minutes;
}

/**
 * runSearchSafely
 * Wraps searchByIngredient in a try/catch so bad input cannot crash the program.
 * @param {Array<object>} recipes
 * @param {string} term
 * @param {Function} searchFn
 * @returns {Array<object>}
 */
function runSearchSafely(recipes, term, searchFn) {
  try {
    const clean = validateSearchInput(term);
    return searchFn(recipes, clean);
  } catch (err) {
    console.log(`  [error] ${err.name}: ${err.message}`);
    return [];
  }
}

module.exports = { validateSearchInput, validateMaxTime, runSearchSafely };