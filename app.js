(async function () {

    //sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="opus,vp8"');

    let video = document.querySelector("video");

    function blobToArrayBuffer(blob) {

        return new Promise(resolve => {
            var reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.readAsArrayBuffer(blob);
        });
    }

    let mediaSource, recorder;

    document.querySelector("#btn-show-video").onclick = function () {
        if (mediaSource) {
            mediaSource.endOfStream();
        }
        if (recorder) {
            recorder.stop();
        }

        mediaSource = new MediaSource();
        mediaSource.addEventListener('sourceopen', function () {
            recorder = new MediaRecorder(stream, {mimeType: 'video/webm; codecs="opus,vp8"'});
            let sb = mediaSource.addSourceBuffer('video/webm; codecs="opus,vp8"');
            recorder.ondataavailable = async function (e) {
                sb.appendBuffer(await blobToArrayBuffer(e.data));
            };
            recorder.start(300);
        });
        video.src = URL.createObjectURL(mediaSource);
        video.play();
    };

    let stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});

})();