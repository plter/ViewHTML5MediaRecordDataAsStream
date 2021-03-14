import Constants from "./Constants"

export default class MediaStreamPipeline {

    constructor(targetVideoElement) {
        this._targetVideoElement = targetVideoElement;
    }

    addBuffer(arrayBuffer, isFirstBuffer = false) {


        if (!isFirstBuffer) {
            this._currentSourceBuffer.appendBuffer(arrayBuffer);
        } else {
            this._mediaSource = new MediaSource();
            this._mediaSource.addEventListener("sourceopen", function (e) {
                this._currentSourceBuffer = this._mediaSource.addSourceBuffer(Constants.MIME_TYPE);
                this._currentSourceBuffer.appendBuffer(arrayBuffer);
            }.bind(this));

            if (this._targetVideoElement.src) {
                URL.revokeObjectURL(this._targetVideoElement.src);
            }
            this._targetVideoElement.src = URL.createObjectURL(this._mediaSource);
            this._targetVideoElement.play();
        }
    }
}