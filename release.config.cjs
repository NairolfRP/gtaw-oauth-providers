/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  extends: "semantic-release-monorepo",
  branches: ["main", { name: "next", prerelease: true }],
};
