# textlint-rule-fix-my-typos

Rule of textlint in order to fix my typos I often do and not detected by spell checkers.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-fix-my-typos

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "fix-my-typos": true
    }
}
```

Via CLI

```
textlint --rule fix-my-typos README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

GPL-3.0-or-later © Shota Izumiyama
