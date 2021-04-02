// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const http = window.node_http;

const Renderer = {

    async previewVideo() {
        this._stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        document.querySelector("video").srcObject = this._stream;
    },


    readBlob(blob) {
        return new Promise(resolve => {
            let r = new FileReader();
            r.onload = () => {
                resolve(r.result);
            };
            r.readAsArrayBuffer(blob);
        });
    },

    startHttpServerOnPort(port) {
        return new Promise((resolve, reject) => {
            let server = http.createServer((req, res) => {
                if (req.url == "/stream.webm") {
                    res.setHeader("Content-Type", "video/webm");

                    let mr = new MediaRecorder(this._stream, { mimeType: 'video/webm; codecs="opus,vp8"' });
                    mr.ondataavailable = async e => {
                        res.write(window.node_Buffer.from(await this.readBlob(e.data)));
                    };

                    res.once("close", () => {
                        mr.stop();
                        console.log("Client closed");
                    });
                    mr.start(30);
                } else {
                    res.end("Not found");
                }
            }).listen(port, resolve);
            server.on("error", reject);
        });
    },

    startSocketServerOnPort(port) {
        net.createServer(socket => {
            let mr = new MediaRecorder(this._stream, { mimeType: 'video/webm; codecs="opus,vp8"' });
            mr.ondataavailable = async e => {
                socket.write(window.node_Buffer.from(await this.readBlob(e.data)));
            };

            socket.once('close', () => {
                mr.stop();
                console.log("Client closed");
            });
            mr.start(30);

        }).listen(port);
    },

    async main() {
        await this.previewVideo();
        await this.startHttpServerOnPort(9010);
        this.startSocketServerOnPort(9011);
        document.querySelector(".status").innerHTML = "Server started at port 9010.";
    }
};

Renderer.main();


