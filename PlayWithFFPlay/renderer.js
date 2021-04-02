// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

(async () => {

    let p = child_process.spawn("ffplay", ["-fflags", "nobuffer", "-i", "-"]);

    p.stdout.on("data", d => {
        console.log(d.toString());
    });
    p.stderr.on("data", d => {
        console.log(d.toString());
    });


    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    let mr = new MediaRecorder(stream);
    mr.ondataavailable = async e => {
        p.stdin.write(node_Buffer.from(await e.data.arrayBuffer()));
    };
    mr.start(30);

    p.on("exit", code => {
        console.log("exit");
        mr.stop();
        window.close();
    });
})();