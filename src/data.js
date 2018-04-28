export default [{
    label: "stripe-payments",
    heading: "Payments with Stripe",
    description: "Stripe allows you to process credit card payments in your app. It gives you a simple set of tools for collecting and securing user payment data, and gives you a dashboard for monitoring payments and extracting money. This demo shows you how to collect payment and related information, send it to a server for processing, and add it to your Stripe account.  Note that you can test a stripe credit card form with `4242 4242 4242 4242 4/24 242` to do a fake transaction (try it above!). There are other numbers that will simulate specific types of transactions.",
    links: [{
        label: "Quickstart",
        url: "https://stripe.com/docs/stripe-js/elements/quickstart"
    },{
        label: "API Reference",
        url: "https://stripe.com/docs/api"
    }],
    annotatedExamples: null
},{
    label: "s3-uploads",
    heading: "Uploading files with S3",
    description: "Uploading files on the internet is harder than it first appears, and doubly so when you're storing them with S3. This demo shows you to collect a file from a user, upload it to your server, add the file to an S3 bucket, and return the URL for storage or further processing.",
    links: [{
        label: "AWS SDK - npm",
        url: "https://www.npmjs.com/package/aws-sdk"
    },{
        label: "S3 API Reference",
        url: "https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html"
    },{
        label: "Multer",
        url: "https://www.npmjs.com/package/multer"
    },{
        label: "Multer S3",
        url: "https://www.npmjs.com/package/multer-s3"
    }],
    annotatedExamples: null
},{
    label: "social-auth",
    heading: "Logging in with Facebook",
    description: "There are a lot of ways to handle authentication with Facebook; this is just one of them. It's token-based (JWT) authentication for statelessly accessing protected endpoints. That means that logging in is a matter of getting a token to store in the browser, and then sending that with every API request. It uses Passport on the backend, and no special libraries on the front-end.",
    links: [{
    }],
    annotatedExamples: null
}];
