/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main"],
  extends: "semantic-release-monorepo",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        releaseRules: [
          {
            type: "chore",
            scope: "deps",
            release: "patch",
          },
        ],
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github",
  ],
};
