const path = require('path');

module.exports = {
    entry: {
        "stream_recorder": path.join(__dirname, "SubProjects", "FrontEnd", "StreamRecorder", "src", "index.js")
    },
    mode: "development",
    watch: true,
    output: {
        path: path.resolve(__dirname, 'public', "js"),
        filename: 'bundle.js'
    }
};
