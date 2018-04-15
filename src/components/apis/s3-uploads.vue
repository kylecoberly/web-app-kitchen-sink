/* waks:start=HTML Form=start */
Before you start, you need to setup your bucket on S3.

1. Log into the AWS console and go to S3
2. Create a bucket. Give it a name, and set the permissions to "Grant public read access to this bucket." Use the default settings for everything else.
3. Click on your new bucket, and take note of the `region` value in the URL (eg. `us-west-2`). Add this to your server environment.
4. Next, go to the IAM service on AWS, then go to "Users", then "Add User."
5. Add a descriptive name for the user, choose the "Programmatic Access" option, and go to the next step.
6. Copy the "Access key ID" and the "Secret access key" to your environment - it's the last opportunity to see them, so don't wait.
7. Click on "Bucket Policy". We're going to add the ARN for your user to the policy for this bucket, which gives them access.
<!-- waks:example -->
<template>
<div class="s3">
    <form>
        <label for="file">File</label>
        <input id="file" name="file" type="file" required />

        <input type="submit" value="Upload File" />

        <div id="error"></div>
        <div id="message"></div>
    </form>
</div>
</template>
<!-- waks:end -->

<script>
    export default {
        mounted(){
/* waks:start=Client-Side Code=start
waks:example */
document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("https://web-app-kitchen-sink-api.herokuapp.com/apis/s3-uploads/upload", {
        method: "POST",
        body: formData,
        "Content-Type": "multipart/form-data"
    }).then(response => response.json())
    .then(({data}) => {
        document.querySelector("#message").innerHTML = `
            <p>File was uploaded to: <a href="${data}">${data}<a></p>
        `;
    }).catch(error => {
        document.querySelector("#error").textContent = error.message;
    });
});

/* waks:end */
        }
    };
</script>

<style scoped lang="scss">
@import "~@/styles/_colors";

/* waks:start=Styles=start
The style on the form is basic form styling. The only exception is the element that's created by Stripe, which has the `.StripeElement` class and a few helper classes as seen below.
waks:example */
.s3 {
    padding: 1rem;
    form {
        max-width: 30rem;
        label {
            font-size: 1rem;
        }
        input {
            padding: 1.5rem 1rem;
            width: 100%;
            border: none;
            box-shadow: 0px 0px 4px $light-grey;
            border-radius: 4px;
            &::placeholder {
                color: $light-grey;
            }
            &[type=submit] {
                margin-top: 1rem;
                font-size: 1rem;
                width: 100%;
                background-color: $primary-color-medium;
                color: $white;
                border: none;
                box-shadow: 1px 1px 4px hsl(0, 0%, 50%);
                cursor: pointer;
                &:hover {
                    background-color: lighten($primary-color-medium, 10%);
                }
            }
        }
    }
}
/* waks:end */
</style>
