/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: [
    "main", 
    "next"
  ],
  extends: "semantic-release-monorepo",
  plugins: [
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github",
  ],
};