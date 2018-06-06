/* waks:start=HTML Form=start */
Two things to note on this: make sure to use `enctype="multipart/form-data"` on the form element, and set the input type to "file."
<!-- waks:example -->
<template>
<div class="s3">
    <!-- Important! Your server can only process files with this enctype -->
    <form enctype="multipart/form-data">
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
    const formData = new FormData(event.target);
    fetch(URL, {
        method: "POST",
        // This contains the file to be uploaded
        body: new FormData(event.target)
    }).then(response => response.json())
    .then(({data, error}) => {
        const message = error
            // If there was an error, show it
            ? `There was an error: ${error}`
            // Otherwise, show the URL of the uploaded file
            : `File was uploaded to: <a href="${data}">${data}</a>`
        $message.innerHTML = `<p>${message}</p>`;
    }).catch(error => {
        // If there was a problem, show the error message
        $message.innerHTML = `
            <p>There was an error: ${error.message}</p>
        `;
    });
});
/* waks:end */
        }
    };
</script>

<style scoped lang="scss">
@import "~@/styles/_colors";

/* waks:start=Styles=start
Basic form styling. The form uses a `file` upload type- note that these look different from browser to browser, and can be hard to style directly. You can use the `File` API for more fine-grained control.
waks:example */
.s3 {
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
