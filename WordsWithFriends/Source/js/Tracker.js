var Tracker = new (function () {
    var xTracker = [], yTracker = [];
    var ins = function () { };
    ins.prototype.init = function (xLength, yLength) {
        for (var i = 0; i < xLength; i++) {
            xTracker.push({ changed: false, start: null, end: null });
        }
        for (var i = 0; i < yLength; i++) {
            yTracker.push({ changed: false, start: null, end: null });
        }
    };
    ins.prototype.x = function () {
        return xTracker;
    };
    ins.prototype.y = function () {
        return yTracker;
    };
    ins.prototype.extendX = function (idx) {
        let p = Position.getXY(idx);
        let t = xTracker[p.y];
        t.changed = true;
        if (t.start == null || t.start > p.x) t.start = p.x;
        if (t.end == null || t.end < p.x) t.end = p.x;
    };
    ins.prototype.shrinkX = function (idx, arr) {
        let p = Position.getXY(idx);
        let t = xTracker[p.y];
        //removed from the start
        if (p.x == t.start) {
            let letter = null;
            for (var i = p.x + 1; i <= t.end; i++) {
                letter = arr[posهtion.getIdx(i, p.y)].val;
                if (letter != null) {
                    t.start = i;
                    break;
                }
            }
            if (letter == null) {
                t.start = null;
                t.end = null;
                t.changed = false;
            }
        }
        //removed from the end
        else if (p.x == t.end) {
            let letter = null;
            for (var i = p.x - 1; i >= t.start; i--) {
                letter = arr[Position.getIdx(i, p.y)].val;
                if (letter != null) {
                    t.end = i;
                    break;
                }
            }
            if (letter == null) {
                t.start = null;
                t.end = null;
                t.changed = false;
            }
        }
    };
    ins.prototype.extendY = function (idx) {
        let p = Position.getXY(idx);
        let t = yTracker[p.x];
        t.changed = true;
        if (t.start == null || t.start > p.y) t.start = p.y;
        if (t.end == null || t.end < p.y) t.end = p.y;
    };
    ins.prototype.shrinkY = function (idx, arr) {
        let p = Position.getXY(idx);
        let t = yTracker[p.x];
        //removed from the start
        if (p.y == t.start) {
            let letter = null;
            for (var j = p.y + 1; j <= t.end; j++) {
                letter = arr[Position.getIdx(p.x, j)].val;
                if (letter != null) {
                    t.start = j;
                    break;
                }
            }
            if (letter == null) {
                t.start = null;
                t.end = null;
                t.changed = false;
            }
        }
        //removed from the end
        else if (p.y == t.end) {
            let letter = null;
            for (var j = p.y - 1; j >= t.start; j--) {
                letter = arr[Position.getIdx(p.x, j)].val;
                if (letter != null) {
                    t.end = j;
                    break;
                }
            }
            if (letter == null) {
                t.start = null;
                t.end = null;
                t.changed = false;
            }
        }
    };
    ins.prototype.fix = function () {
        xTracker.forEach((x) => { x.changed = false; });
        yTracker.forEach((x) => { x.changed = false; });
    };
    ins.prototype.print = function () {
        console.log('xTracker: ');
        console.log(xTracker);
        console.log('yTracker: ');
        console.log(yTracker);
    };
    return ins;
}());