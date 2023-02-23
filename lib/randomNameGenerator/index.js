const nouns = require("./data/nouns");
const adjectives = require("./data/adjectives");

function cpaitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}

function generateUsername() {
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  let username;

  username = cpaitalize(adjective) + cpaitalize(noun);

  return username;
}

module.exports = generateUsername;
