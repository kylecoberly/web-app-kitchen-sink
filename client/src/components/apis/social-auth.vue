/* waks:start=HTML Form=start */
This form displays the sign in button if the user is logged out, and top secret data and the option to logout if they're signed in.
<!-- waks:example -->
<template>
<div class="social-auth">
    <!-- If the user is logged out, give them the option to log in -->
    <div class="logged-out">
        <button class="login"><img src="../../assets/facebook-logo.png"/>Sign In</button>
    </div>
    <!-- If the user is logged in, give them the option to get secret data or log out -->
    <div class="logged-in">
        <button class="secret"><img src="../../assets/lock.png" alt="Lock" />Get secret data</button>
        <button class="logout"><img src="../../assets/facebook-logo.png" />Sign out</button>
        <p class="message"></p>
    </div>
</div>
</template>
<!-- waks:end -->

<script>
    export default {
        mounted(){
/* waks:start=Client-Side Code=start
Most of the auth work is done by the server. The general flow of the app works like this:

1. A user clicks on the login button and opens whatever page is sent back in a new tab
    * If the user isn't logged into Facebook, the new page prompts them to sign in
    * If the user is logged into Facebook, the new page takes the token your server created and sends it to this page
2. When the token is sent back to this page, it's stored in `localStorage`
3. Any time a request for secure data is made, the token is sent in the `Authorization` header
4. When a user logs out, the token is removed from `localStorage`

Note that we don't actually have access to the user's data in local storage- only the encrypted token. We could easily send this token to a `/users` endpoint that would return user data for our application to use.
waks:example */
const baseUrl = "https://web-app-kitchen-sink-api.herokuapp.com";

// Get the elements we'll be working with
const $login = document.querySelector(".login");
const $logout = document.querySelector(".logout");
const $loggedIn = document.querySelector(".logged-in");
const $loggedOut = document.querySelector(".logged-out");
const $secret = document.querySelector(".secret");
const $message = document.querySelector(".message");

// Initialize the login status
updateLoginStatus();

// When the user logs in, open a new page with either
// the Facebook login prompt or the page from the server
// that will send a JWT to this page to save
$login.addEventListener("click", event => {
    window.open(`${baseUrl}/apis/social-auth/login`);
});

// When the redirect from the server opens a window with our
// token, this will catch the message from it and allow
// the app to save the token in local storage.
window.addEventListener("message", event => {
    if (event.data.command === "setToken" && event.origin === baseUrl){
        // localStorage will survive a page refresh
        localStorage.setItem("token", event.data.token);
        updateLoginStatus();
    }
});

// When a user wants secret data, send a request to the secure endpoint
// with the `Authorization` header and the user's stored JWT.
$secret.addEventListener("click", event => {
    fetch(`${baseUrl}/apis/social-auth/secure`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).then(response => response.json())
    .then(response => {
        // If there's a message show it, otherwise show an error
        $message.textContent = response.data
            ? response.data
            : "There was an error with your request";
    }).catch(error => throw new Error(error));
});

// Since the server has no concept of us being logged in,
// "logging out" just means deleting the stored token.
$logout.addEventListener("click", event => {
    localStorage.removeItem("token");
    updateLoginStatus();
});

// Toggle display based on whether or not the token has
// been set in local storage
function updateLoginStatus(){
    localStorage.getItem("token")
        ? toggleDisplay($loggedIn, $loggedOut)
        : toggleDisplay($loggedOut, $loggedIn);
}
function toggleDisplay($toShow, $toHide){
    $toShow.style.display = "block";
    $toHide.style.display = "none";
}
/* waks:end */
        }
    };
</script>

<style scoped lang="scss">
@import "~@/styles/_colors";

/* waks:start=Styles=start
The only thing worth noting in the styles is that the Facebook logo and the icon are inside of the button container, and the button itself is flexed to vertically center them.
waks:example */
.social-auth {
    display: flex;
    align-items: center;
    .login, .logout, .secret {
        padding: 1rem;
        background-color: #3b5998;
        color: $white;
        display: inline-flex;
        align-items: center; // Vertically center images
        border: none;
        border-radius: 4px;
        transition: all 0.2s;
        img {
            width: 2rem;
            display: inline-block;
            margin-right: 1rem;
        }
        &:hover {
            transform: scale(1.05);
        }
    }
    .secret {
        background-color: $primary-color-medium;
        margin-right: 1rem;
        &:hover {
            background-color: lighten($primary-color-medium, 10%);
        }
    }
}
/* waks:end */
</style>
