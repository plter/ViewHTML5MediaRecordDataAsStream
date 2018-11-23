(function () {


    let btnStartRecord = document.querySelector("#btn-start-record");
    let btnStopRecord = document.querySelector("#btn-stop-record");
    let btnRequestData = document.querySelector("#btn-request-data");

    let recorder;

    function createVideo(url) {
        let video = document.createElement("video");
        video.controls = true;
        video.src = url;
        video.width = 120;
        document.body.appendChild(video);
    }

    btnStopRecord.onclick = async function () {
        if (recorder) {
            recorder.stop();
            recorder = null;
        }
    };

    btnStartRecord.onclick = async function () {
        if (recorder) {
            alert("录制中...");
            return;
        }

        let stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        recorder = new MediaRecorder(stream, {mimeType: 'video/webm; codecs="opus,vp8"'});
        recorder.ondataavailable = function (e) {
            createVideo(URL.createObjectURL(e.data));
        };
    };

    btnRequestData.onclick = function () {
        if (recorder) {
            recorder.start();
            setTimeout(function () {
                recorder.stop();
            }, 3000);
        }
    };
})();