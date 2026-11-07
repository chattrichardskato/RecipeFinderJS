// src/validate.js
// REQUIREMENT: "Exceptions (throw plus try/catch)".
// Every public function here validates its input and throws a typed Error on bad data.

/**
 * validateSearchInput
 * Ensures a search term is a non-empty string of at least 2 characters.
 * Throws TypeError if not a string, RangeError if too short.
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
 * Throws TypeError for non-numbers, RangeError for values <= 0.
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
 * parseRecipeQuery
 * Converts a raw "cuisine:italian, maxTime:30" query string into a validated
 * object. Throws a SyntaxError on unknown keys or missing values, and lets
 * validateMaxTime's errors bubble up.
 * @param {string} raw
 * @returns {{ cuisine?: string, maxTime?: number }}
 */
function parseRecipeQuery(raw) {
  if (typeof raw !== "string" || raw.trim() === "") {
    throw new SyntaxError("Query must be a non-empty string.");
  }

  const result = {};
  const parts = raw.split(",").map((p) => p.trim());

  for (const part of parts) {
    const [key, value] = part.split(":").map((s) => (s || "").trim());
    if (!key || !value) {
      throw new SyntaxError(`Malformed query segment: "${part}".`);
    }
    switch (key) {
      case "cuisine":
        result.cuisine = value.toLowerCase();
        break;
      case "maxTime":
        result.maxTime = validateMaxTime(Number(value));
        break;
      default:
        throw new SyntaxError(`Unknown query key: "${key}".`);
    }
  }

  return result;
}

/**
 * runSearchSafely
 * Wraps any search function in try/catch so bad user input cannot crash the program.
 * Returns an empty array on failure and prints the error type + message to the screen.
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
    console.log(`  [caught] ${err.name}: ${err.message}`);
    return [];
  }
}

module.exports = {
  validateSearchInput,
  validateMaxTime,
  parseRecipeQuery,
  runSearchSafely
};