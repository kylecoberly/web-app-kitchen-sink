/* waks:start=HTML=start */
There's not much to the HTML; we'll need a place to list our cameras, show their streams, list any snapshots we take, and display any error messages.
<!-- waks:example -->
<template>
    <div class="camera-demo">
        <div class="cameras">
            <h3>Available Cameras</h3>
            <ul></ul>
        </div>
        <ul class="video-previews"></ul>
        <ul class="snapshots"></ul>
        <p class="message"></p>
    </div>
</template>
<!-- waks:end -->

<script>
export default {
    mounted(){
/* waks:start=Setup=start
After grabbing a couple of DOM elments, we'll initialize the page. The initialization does the following:

1. Check to see if their browser supports accessing media devices
2. Gets a list of the available media devices from the browser
3. Narrows that down to a list of cameras
4. Displays a list of buttons to the user that allows them to activate a camera
/* waks:example */
// The elements we'll use
const $cameras = document.querySelector(".cameras ul");
const $videoPreviews = document.querySelector(".video-previews");
const $snapshots = document.querySelector(".snapshots");
const $message = document.querySelector(".message");

(function initialize(){
    // Feature-check to make sure their browser supports this,
    // and short-circuits the initialization if it does
    if (!navigator.mediaDevices){
        return $messages.textContent = "Your browser doesn't support media device access";
    } else if (!window.MediaRecorder){
        return $messages.textContent = "Your browser doesn't support the MediaRecorder API";
    }
    // This lists all media devices attached to the computer
    navigator.mediaDevices.enumerateDevices()
        .then(getCameras) // only the cameras
        .then(showCameraList) // display them to the user
        .catch(error => {
            $message.textContent = error.message;
        });
})();

// Audio devices also show up in this list- filter for cameras
function getCameras(devices){
    return devices.filter(device => device.kind === "videoinput");
}

// Make the cameras show up as a list of buttons
function showCameraList(devices){
    return devices
        .map(createCameraButton)
        .map(createCameraListItem)
        .forEach($camera => $cameras.appendChild($camera));

    function createCameraButton(device){
        const $button = document.createElement("button");
        $button.classList.add("add-camera");
        // The label of a device is hidden until the
        // user grants permission, so you need a default
        const label = device.label ? device.label : "new camera";
        $button.innerHTML = `
            <i class="material-icons">videocam</i><span>Show ${label}</span>
        `;
        $button.addEventListener("click", event => {
            showVideo(device.deviceId); // This makes the video display
            event.target.remove(); // and this makes the button disappear
        });

        return $button;
    }
    function createCameraListItem($button){
        const $li = document.createElement("li");
        $li.classList.add("camera");
        $li.appendChild($button);
        return $li;
    }
}
/* waks:end */

/* waks:start=Video Recording=start
This section:

1. Takes the ID of a user-selected camera
2. Turns the resulting audio/video stream
3. Adds it to a video element
4. Appends the element to the page

Additionally, we setup the functions for recording a media stream and encoding it into a video.
/* waks:example */
function showVideo(id){
    // Given the ID of the camera the user selected, this requests
    // permission for this specific camera. There are a lot of
    // other constraints you can pass, such as whether the camera
    // is `user` or `environment` facing.
    return navigator.mediaDevices.getUserMedia({
        audio: true, // Lets the user select an audio source
        video: {
            deviceId: {
                exact: id
            }
        }
    // This returns a stream, which needs to be a video
    }).then(createVideo)
    // Then add the video to the page
    .then(appendVideo)
    .catch(error => $message.textContent = error.message);
}

function createVideo(stream){
    const $videoContainer = document.createElement("div");
    $videoContainer.classList.add("video-container");
    const $video = document.createElement("video");
    $video.srcObject = stream; // This where we'll store the stream object
    $video.muted = true; // Otherwise it monitors the audio
    // Once the file has finished loading, play it
    $video.addEventListener("loadedmetadata", event => event.target.play());
    $videoContainer.appendChild($video);

    return $videoContainer;
}

// How recording a video works
function startRecording(recording){
    const chunks = [];
    recording.start();
    // Whenever the recording spits out a video chunk, add it to the array
    recording.addEventListener("dataavailable", event => chunks.push(event.data));
    recording.addEventListener("stop", event => {
        // When someone stops the recording, turn the chunks into a video,
        // then make them download it. You could also POST it to a server here
        const video = chunksToVideo(chunks);
        downloadVideo(video);
    });
}

// Combines the video chunks into an encoded file
function chunksToVideo(chunks){
    const blob = new Blob(chunks, {
        // `webm` is probably your best bet for compatibility
        "type": "video/webm; codecs=vp9"
    });
    // Turns it into a BLOB in memory and return the pointer
    return URL.createObjectURL(blob);
}

function appendVideo($videoContainer){
    const $li = document.createElement("li");
    $li.appendChild(createVideoRecorder($videoContainer));
    $videoPreviews.appendChild($videoContainer);
}
/* waks:end */

/* waks:start=Media Controls=start
This sets up the user controls for recording videos and taking pictures.
/* waks:example */
function createVideoRecorder($videoContainer){
    const $video = $videoContainer.querySelector("video");
    // MediaRecorder is a new API - it doesn't work in some
    // browsers, most notably Safari and Edge. For these
    // browsers, your best bet is probably WebRTC. WebRTC requires
    // a server to work, which may be an advantage if the goal
    // is to save the file there since there's no upload step.
    const recording = new MediaRecorder($video.srcObject);

    const $buttonBar = createButtonBar([
        buildRecordButton(recording),
        buildStopButton(recording),
        buildSnapshotButton($video)
    ]);

    // Add the video and the button bar to the container
    return [$video, $buttonBar].reduce(($videoContainer, $element) => {
        $videoContainer.appendChild($element);
        return $videoContainer;
    }, $videoContainer);
}

function createButtonBar($buttons){
    // Make record and stop toggle
    addToggleToButtons($buttons[0], $buttons[1]);
    // This adds all of the buttons to a list,
    // which will be added to the video container
    const $buttonBar = $buttons.reduce(($list, $element) => {
        const $li = document.createElement("li");
        $li.appendChild($element);
        $list.appendChild($li);
        return $list;
    }, document.createElement("ul"));
    $buttonBar.classList.add("button-bar");

    return $buttonBar;

    // Hides stop button until record is clicked,
    // Then shows stop until it's clicked
    function addToggleToButtons($record, $stop){
        $stop.style.display = "none";
        $record.addEventListener("click", event => {
            event.target.style.display = "none";
            $stop.style.display = "inline-block";
        });
        $stop.addEventListener("click", event => {
            event.target.style.display = "none";
            $record.style.display = "inline-block";
        });
    }
}

function buildRecordButton(recording){
    const $start = document.createElement("button");
    $start.classList.add("material-icons", "record");
    $start.textContent = "fiber_manual_record"; // Material icon for record
    $start.addEventListener("click", startRecording.bind(null, recording));
    return $start;
}

function buildStopButton(recording){
    const $stop = document.createElement("button");
    $stop.classList.add("material-icons", "stop");
    $stop.textContent = "stop"; // Material icon
    // Fire the stop event on the recording when we click the button
    $stop.addEventListener("click", event => recording.stop());
    return $stop;
}

function buildSnapshotButton($video){
    const $snap = document.createElement("button");
    $snap.classList.add("material-icons", "snap");
    $snap.textContent = "photo_camera";
    $snap.addEventListener("click", takeSnapshot.bind(null, $video));
    return $snap;
}
/* waks:end */

/* waks:start=Taking a Snapshot=start
To take a picture, you need a video element. From that you write the current state of the video screen to a canvas, and then turn the canvas into a `.png` data URL.
/* waks:example */
function takeSnapshot($video){
    const $canvas = getCanvasFromVideo($video);
    const $img = getImageFromCanvas($canvas);
    addSnapshot($img);
}

function getCanvasFromVideo($video){
    const $canvas = document.createElement("canvas");
    const {offsetWidth: width, offsetHeight: height} = $video;
    $canvas.height = height;
    $canvas.width = width;
    // This is the part of the canvas that you draw to,
    // as opposed to just a reference to the element
    const context = $canvas.getContext("2d");
    // This draws whatever is currently on the video preview
    context.drawImage($video, 0, 0, width, height);

    return $canvas;
}

function getImageFromCanvas($canvas){
    const $img = document.createElement("img");
    // Convert the current canvas to a data URL
    // and set it to an image `src`
    $img.src = $canvas.toDataURL("image/png");
    return $img;
}

function addSnapshot($img){
    const $li = document.createElement("li");
    $li.appendChild($img);
    $snapshots.appendChild($img);
}

// This is a hacky trick to force a user download
function downloadVideo(video){
    const $a = createVideoLink(); // Create an anchor link
    $a.href = video; // link to the pointer to the video in memory
    document.body.appendChild($a); // Add it to the DOM
    $a.click(); // Click it to download
    // Destroy the enormous video BLOB you created
    // to free up memory
    window.URL.revokeObjectURL(video);
    $a.remove(); // Destroy the link element you added

    function createVideoLink(){
        const $a = document.createElement("a");
        $a.style = "display: none;";
        // Whatever the filename should be
        $a.download = `web-video-${Date.now()}.webm`;
        return $a;
    }
}
/* waks:end */
    }
};

</script>

<style lang="scss">
/* waks:start=Styles=start
The most interesting thing to note in the styles is the recording animation. When the video is recording, it pulses the background color.
/* waks:example */
@import "~@/styles/_colors";

.camera-demo {
    padding: 1rem;
    width: 100%;
    .cameras {
        background-color: $light-grey;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 4px;
        .camera {
            margin-right: 1rem;
            display: inline-block;
            .add-camera {
                display: flex;
                padding: 1rem;
                border: none;
                background-color: $primary-color-light;
                color: $pure-white;
                border-radius: 4px;
                align-items: center;
                transition: all 0.2s;
                &:hover {
                    transform: scale(1.05);
                }
            }
        }
    }
    .video-container {
        position: relative;
        button {
            border: none;
            color: $pure-white;
            border-radius: 4px;
            display: inline-block;
            transition: all 0.2s;
            padding: 0.5rem 2rem;
            &:hover {
                transform: scale(1.05);
            }
        }
    }
    .button-bar {
        position: absolute;
        display: flex;
        justify-content: space-between;
        right: 1rem;
        bottom: 1rem;
        li {
            display: inline-block;
            margin: 0 0.25rem;
        }
        .record {
            background-color: $alert;
        }
        .snap {
            background-color: $primary-color-medium;
        }
        .stop {
            /* Apply the animation to the stop button */
            animation: recording 0.7s ease infinite alternate;
        }
    }
    // This animation pulses between red and grey while recording
    @keyframes recording {
        from {
            background-color: $alert;
        }
        to {
            background-color: $dark-grey;
        }
    }
    video {
        width: 100%;
        border-radius: 4px;
    }
    .snapshots {
        width: 100%;
        img {
            border-radius: 4px;
            width: 100%;
        }
    }
}
/* waks:end */
</style>
