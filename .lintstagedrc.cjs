const typeCheck = () => `tsc --project ./tsconfig.json --noEmit`

module.exports = {
  '*.{ts,tsx}': [
    'eslint --report-unused-disable-directives --max-warnings 0 --cache --fix',
    typeCheck,
    "jest --bail --findRelatedTests"
  ],
}