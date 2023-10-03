module.exports = {
  coverageReporters: ['json-summary', 'text', 'lcov'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '(?!(/node_modules/(react-markdown|vfile|vfile-message|unist-.*|unified|bail|is-plain-obj|trough|remark-.*|mdast-util-.*|micromark.*|decode-named-character-reference|character-entities|property-information|hast-util-whitespace|space-separated-tokens|comma-separated-tokens|pretty-bytes)/))(/node_modules/.+.(js|jsx|mjs|cjs|ts|tsx)$)',
    '^.+.module.(css|sass|scss)$',
  ],
  setupFilesAfterEnv: ['./setupEnzyme.js'],
}
