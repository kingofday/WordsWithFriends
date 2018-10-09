var Position = new (function () {
    var rowLength = 11;
    var ins = function () { };
    ins.prototype.getXY = function (idx) {
        return { x: idx % rowLength, y: Math.floor(idx / rowLength) };
    };
    ins.prototype.getIdx = function (x, y) {
        return y * rowLength + x;
    };
    return ins;
}());