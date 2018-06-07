function decode(fileContents){
    return splitByLine(fileContents).reduce((accumulator, line) => {
        if (/waks\:start-annotation=/.test(line)) {
            accumulator.annotatedExamples.push({
                heading: /waks\:start-annotation=(.*)/.exec(line)[1],
                annotation: "",
                example: ""
            });
            accumulator.inAnnotation = true;
            accumulator.inExample = false;
        } else if (/waks\:end-annotation/.test(line)) {
            accumulator.inAnnotation = false;
        } else if (/waks\:start-example/.test(line)) {
            accumulator.inExample = true;
        } else if (/waks\:end-example/.test(line)) {
            accumulator.inExample = false;
        } else if (accumulator.inAnnotation) {
            accumulator.annotatedExamples[accumulator.annotatedExamples.length - 1].annotation += `${line}\n`;
        } else if (accumulator.inExample) {
            accumulator.annotatedExamples[accumulator.annotatedExamples.length - 1].example += `${line}\n`;
        }
        return accumulator;
    }, {
        inAnnotation: false,
        inExample: false,
        annotatedExamples: []
    }).annotatedExamples;
}

function splitByLine(string){
    return string.split(/\r?\n/);
}

module.exports = {
    decode
};
