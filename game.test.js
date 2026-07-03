const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadGameData() {
  const source = fs.readFileSync("game.js", "utf8");
  const sandbox = {
    document: {
      querySelector() {
        return {
          addEventListener() {},
          append() {},
          classList: { add() {} },
          innerHTML: "",
          textContent: "",
        };
      },
      querySelectorAll() {
        return [];
      },
      createElement() {
        return {
          addEventListener() {},
          append() {},
          classList: { add() {} },
          dataset: {},
        };
      },
    },
    Math,
  };

  vm.runInNewContext(`${source}\nthis.figures = figures; this.orderedFigures = orderedFigures;`, sandbox);
  return sandbox;
}

test("includes exactly the requested 20 figures", () => {
  const { figures } = loadGameData();
  assert.equal(figures.length, 20);
  assert.deepEqual(
    Array.from(figures, (figure) => figure.name).sort(),
    [
      "Albert Einstein",
      "Anne Frank",
      "Aristotle",
      "Augustus",
      "Buddha",
      "Charles Darwin",
      "Galileo Galilei",
      "Genghis Khan",
      "George Washington",
      "Henry VIII",
      "Isaac Newton",
      "Julius Caesar",
      "Leonardo da Vinci",
      "Ludwig van Beethoven",
      "Marco Polo",
      "Michelangelo",
      "Moses",
      "Nelson Mandela",
      "Queen Victoria",
      "William the Conqueror",
    ],
  );
});

test("orders figures from most recent birth year to oldest", () => {
  const { orderedFigures } = loadGameData();
  assert.deepEqual(
    Array.from(orderedFigures, (figure) => figure.name),
    [
      "Anne Frank",
      "Nelson Mandela",
      "Albert Einstein",
      "Queen Victoria",
      "Charles Darwin",
      "Ludwig van Beethoven",
      "George Washington",
      "Isaac Newton",
      "Galileo Galilei",
      "Henry VIII",
      "Michelangelo",
      "Leonardo da Vinci",
      "Marco Polo",
      "Genghis Khan",
      "William the Conqueror",
      "Augustus",
      "Julius Caesar",
      "Aristotle",
      "Buddha",
      "Moses",
    ],
  );
});

test("does not expose the next answer or reveal birth years", () => {
  const html = fs.readFileSync("index.html", "utf8");
  const source = fs.readFileSync("game.js", "utf8");

  assert.equal(html.includes("Next target"), false);
  assert.equal(html.includes("next-target"), false);
  assert.equal(source.includes("Next correct answer"), false);
  assert.equal(source.includes("birth-year"), false);
  assert.equal(source.includes("formatBirthYear"), false);
});
