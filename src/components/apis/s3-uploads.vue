/* waks:start=HTML Form=start */
The form uses a `file` upload type. Note that these look different from browser to browser, and can be hard to style directly. You can use the `File` API for more fine-grained control.
<!-- waks:example -->
<template>
<div class="s3">
    <form>
        <label for="file">File</label>
        <input id="file" name="file" type="file" required />

        <input type="submit" value="Upload File" />

        <div id="message"></div>
    </form>
</div>
</template>
<!-- waks:end -->

<script>
    export default {
        mounted(){
/* waks:start=Client-Side Code=start
When the upload form submits, you intercept and interrupt the request. Make a `POST` request to your server, and then display the success message or error when it comes back. Note that you *must* send the message as `multipart/form-data`, or the server won't process it!
waks:example */
// Store the message element
const $message = document.querySelector("#message");

// Attach a listener to the submit event for the form
document.querySelector("form").addEventListener("submit", event => {
    // Prevent the browser from handling the form submission directly
    event.preventDefault();

    // Upload endpoint on the server
    const URL = "https://web-app-kitchen-sink-api.herokuapp.com/apis/s3-uploads/upload";
    fetch(URL, {
        method: "POST",
        body: new FormData(event.target), // The body will be the uploaded file
        headers: {
            // Important! Your server can only process files with this type
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.json())
    .then(({data}) => {
        // Show the URL of the uploaded file
        $message.innerHTML = `
            <p>File was uploaded to: <a href="${data}">${data}<a></p>
        `;
    }).catch(error => {
        // If there was a problem, show the error message
        $message.textContent = error.message;
    });
});
/* waks:end */
        }
    };
</script>

<style scoped lang="scss">
@import "~@/styles/_colors";

/* waks:start=Styles=start
Basic form styling.
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
