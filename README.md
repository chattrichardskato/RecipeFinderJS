# Overview

I am working to grow as a software engineer by going deeper into modern JavaScript — specifically
ES6 array methods, recursion, working with third-party packages, and structured error handling.
This project is my hands-on attempt to move from "I can write JavaScript" to "I understand how
JavaScript is used to build a real, runnable program."

The software I wrote is **RecipeFinderJS**, a Node.js terminal application that searches and
analyses a small recipe dataset. When the user runs `npm start`, the program prints a series of
results: recipes containing a chosen ingredient, recipes filtered by cuisine or cook time, a
lookup by name, aggregate statistics, a recursive ingredient count, and a demonstration of
defensive input validation. All output is colourised in the terminal using the `chalk`
third-party library.

My purpose in writing this software was to prove to myself that I can take a plain idea
("search some recipes") and build it as a proper multi-file Node project — separate modules for
data, search logic, recursion, formatting and validation — with each language feature the
program relies on clearly isolated in its own file. I wanted the code to be readable enough
that someone else could point at any one line and see exactly which JavaScript concept it
demonstrates.

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

I developed the software in **Visual Studio Code** on Windows, using VS Code's integrated
terminal for all commands. I installed **Node.js (LTS)** and used **npm** to manage the single
third-party dependency. The project is version-controlled with **Git** and hosted on **GitHub**
as a public repository.

The programming language is **JavaScript (ES6+)** running on the **Node.js** runtime. The only
external library is **`chalk`** (v4.1.2), which I used for coloured and bold terminal output.
I kept the project in CommonJS (`require` / `module.exports`) so it runs directly with `node`
without any build step, and so the chalk version and module system stay compatible.

# Useful Websites

- [MDN JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MDN — Array methods reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Node.js — Getting started guide](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [chalk npm package documentation](https://www.npmjs.com/package/chalk)
- [MDN — try...catch and Error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

# Future Work

- Replace the hardcoded recipe dataset with a real recipe API (e.g. Spoonacular), loading the
  API key from a `.env` file via `dotenv` so secrets are never committed.
- Add an interactive prompt using Node's `readline` module so the user can type queries instead
  of watching a scripted demo run top-to-bottom.
- Add unit tests with Jest to formally cover each array-method function, the recursive helpers,
  and the validation functions, instead of relying on visual inspection of terminal output.
- Refactor `search.js` into a class with cached query results so repeated searches don't
  re-scan the dataset.