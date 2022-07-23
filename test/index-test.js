"use strict";
import TextLintTester from "textlint-tester";
const tester = new TextLintTester();
// rule
import rule from "../src/index";
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        // no problem
        "text is fine."
    ],
    invalid: [
        // single match
        {
            text: "This includes typoos.",
            errors: [
                {
                    message: "Found candidate of typo: \"typoos\". -> \"typos\"?",
                    line: 1,
                    column: 15
                }
            ]
        },
        // multiple match
        {
            text: `This includes typoos.

Many typoos.`,
            errors: [
                {
                    message: "Found candidate of typo: \"typoos\". -> \"typos\"?",
                    line: 1,
                    column: 15
                },
                {
                    message: "Found candidate of typo: \"typoos\". -> \"typos\"?",
                    line: 3,
                    column: 6
                }
            ]
        },

    ]
});
