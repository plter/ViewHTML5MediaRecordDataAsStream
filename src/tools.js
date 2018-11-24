export default {
    blobToArrayBuffer: function (blob) {

        return new Promise(resolve => {
            var reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.readAsArrayBuffer(blob);
        });
    }
}