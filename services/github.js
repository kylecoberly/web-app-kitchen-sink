require("dotenv").load();

const {decode} = require("./base64");
const github = new (require("@octokit/rest"));
github.authenticate({
    type: "token",
    token: process.env.GITHUB_API_KEY
});

function getFile(owner, repo, path){
    return github.repos.getContent({owner, repo, path})
        .then(response => decode(response.data.content))
        .catch(error => "");
}

async function getBackendExamples(route){
    try {
        const apiFile = await getFile(
            process.env.GITHUB_USERNAME,
            process.env.GITHUB_REPO,
            `routes/apis/${route}.js`
        );
        const patternFile = await getFile(
            process.env.GITHUB_USERNAME,
            process.env.GITHUB_REPO,
            `routes/patterns/${route}.js`
        );

        return apiFile.concat(patternFile);
    } catch(error){
        console.error(error.message);
    }
}

async function getFrontendExamples(component){
    try {
        const apiFile = await getFile(
            process.env.GITHUB_USERNAME,
            process.env.GITHUB_REPO,
            `client/src/components/apis/${component}.vue`
        );
        const patternFile = await getFile(
            process.env.GITHUB_USERNAME,
            process.env.GITHUB_REPO,
            `client/src/components/patterns/${component}.vue`
        );
        return apiFile.concat(patternFile);
    } catch(error){
        console.error(error.message);
    }
}

function getAllExamples(label){
    return Promise.all([
        getFrontendExamples(label),
        getBackendExamples(label)
    ]).then(([frontendExamples, backendExamples]) => {
        return frontendExamples.concat(backendExamples)
    });
}

module.exports = {
    getFile,
    getFrontendExamples,
    getBackendExamples,
    getAllExamples
};
