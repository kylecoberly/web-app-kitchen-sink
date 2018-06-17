export default [{
    label: "stripe-payments",
    type: "api-example",
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
    type: "api-example",
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
    type: "api-example",
    heading: "Logging in with Facebook",
    description: "There are a lot of ways to handle authentication with Facebook; this is just one of them. It's token-based (JWT) authentication for statelessly accessing protected endpoints. That means that logging in is a matter of getting a token to store in the browser, and then sending that with every API request. It uses Passport on the backend, and no special libraries on the front-end.",
    links: [{
        label: "Passport.js",
        url: "http://www.passportjs.org/"
    }],
    annotatedExamples: null
},{
    label: "camera",
    type: "api-example",
    heading: "Accessing device cameras",
    description: "Browsers now have access to device cameras and microphones, and can use them to take pictures or record videos. This example lists the attached cameras (you won't be able to see their names until you give permission because security), and when you select one you'll be able to monitor its output in a video player. You can use the controls in the player to take pictures (which will list below), or record videos (which will prompt for download). Note that the video recording may not work on some browsers, as it requires support for the MediaRecorder API. If that's the case, WebRTC has wider support, but requires a server to encode the stream into a video.",
    links: [{
        label: "MDN: MediaDevices.getUserMedia",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia"
    }],
    annotatedExamples: null
},{
    label: "single-responsibility-principle",
    type: "pattern-example",
    heading: "Single Responsibility Principle",
    description: "The Single Responsibility Principle (also known as SRP), is a part of the SOLID guidelines for writing maintainable OOP code. It states that class should be responsible for one, and only one thing. As classes grow, sometimes they start taking on too many responsibilities, which should be split into new classes. Sometimes this is referred to a class having 'only one reason to change.'",
    problem: "'God classes' that do too many things, which impacts readability and maintainability",
    links: [{
        label: "Wikipedia: Single Responsibility Principle",
        url: "https://en.wikipedia.org/wiki/Single_responsibility_principle"
    },{
        label: "Think you understand the Single Responsibility Principle?",
        url: "https://hackernoon.com/you-dont-understand-the-single-responsibility-principle-abfdd005b137"
    }],
    annotatedExamples: null
},{
    label: "factory-method",
    type: "pattern-example",
    heading: "Factory Method",
    description: "A factory method is a pattern in OOP that gives you an instance of a class with a particular interface without needing to know exactly which class it is. For example, if your app needs a database connection, it probably doesn't care whether it's a MySQL or PostgreSQL connection, even though those have different implementations. You can use a factory to separate those details from your app.",
    problem: "Masking complexity or insulating from future change",
    links: [{
        label: "Wikipedia: Factory Pattern Methods",
        url: "https://en.wikipedia.org/wiki/Factory_method_pattern"
    },{
        label: "Factories vs. Factory Methods vs. Abstract Factories",
        url: "https://en.wikipedia.org/wiki/Factory_method_pattern"
    }],
    annotatedExamples: null
}];
