import MediaStreamPipeline from "./MediaStreamPipeline";
import tools from './tools'
import Constants from './Constants'

class Main {

    constructor() {
        this._socket = io();

        this._previewVideo = document.querySelector("#preview");
        this._pipeline = new MediaStreamPipeline(this._previewVideo);

        this._asyncInit();
    }

    async _asyncInit() {
        this._stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        document.querySelector("#btn-refresh").onclick = this._btnFreshClickedHandler.bind(this);
    }

    _btnFreshClickedHandler() {
        if (this._currentMediaRecorder) {
            this._currentMediaRecorder.ondataavailable = null;
            this._currentMediaRecorder.stop();
        }

        let mr = this._currentMediaRecorder = new MediaRecorder(this._stream, {mimeType: Constants.MIME_TYPE});
        mr._isFirstBuffer = true;
        mr.ondataavailable = async e => {
            this._socket.emit("media_stream", e.data);
            let buffer = await tools.blobToArrayBuffer(e.data);
            this._pipeline.addBuffer(buffer, e.target._isFirstBuffer);
            e.target._isFirstBuffer = false;
        };
        mr.start(300);
    }
}

new Main();