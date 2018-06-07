const assert = require("assert");
const {decode} = require("../../services/waks");

describe("WAKS", () => {
    it("decodes a WAKS-markup file", () => {
        const encodedString = `
// Ignore this
/* waks:start-annotation=This is a Heading
Annotation
/* waks:end-annotation */
/* waks:start-example */
const a = 'a';
/* waks:end-example */
// Ignore this too
        `;
        assert.deepEqual(decode(encodedString), [{
            heading: "This is a Heading",
            annotation: "Annotation\n",
            example: "const a = 'a';\n"
        }]);
    });
    it("decodes a WAKS-markup file with multiple annotations", () => {
        const encodedString = `
// Ignore this
/* waks:start-annotation=This is a Heading
Annotation1
waks:end-annotation */
/* waks:start-example */
const a = 'a';
/* waks:end-example */
// Ignore this too
/* waks:start-annotation=This is a Heading
Annotation2
waks:end-annotation */
/* waks:start-example */
const b = 'b';
/* waks:end-example */
// Ignore this as well
        `;
        assert.deepEqual(decode(encodedString), [{
            heading: "This is a Heading",
            annotation: "Annotation1\n",
            example: "const a = 'a';\n"
        },{
            heading: "This is a Heading",
            annotation: "Annotation2\n",
            example: "const b = 'b';\n"
        }]);
    });
});
