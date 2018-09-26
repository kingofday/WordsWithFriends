var Board = new (function () {
    var arr = [];
    var xLength = 11;
    var yLength = 11;
    var origin = {};
    var fixCounter = 0;
    var ins = function () { };
    ins.prototype.init = () => {
        arr = [];
        origin.x = Math.floor(xLength / 2);
        origin.y = Math.floor(yLength / 2);
        origin.id = Position.getIdx(origin.x, origin.y);
        let id = 0;
        let tbodyContent = '';
        for (var x = 0; x < xLength; x++) {
            tbodyContent += '<tr>';
            for (var y = 0; y < yLength; y++) {
                tbodyContent += `<td>
                            <span class="d-none">`+ id + `</span>
                            <input id="txt_`+ id + `" data-id="` + id + `" class="txt empty" type="text" value="" placeholder="" />
                       </td>`;
                arr.push({ id: id, x: x, y: y, fixed: false, val: null });
                id++;
            }
            tbodyContent += '</tr>';
        }
        $('tbody').append(tbodyContent);
        $('#txt_' + origin.id).addClass('origin').focus();
        Tracker.init(xLength, yLength);
    };
    ins.prototype.axisChecker = function () {
        var filledArr = arr.filter(x => x.fixed == false && x.val != null);
        let someItem = filledArr[0];
        if (filledArr.every(item => item.x == someItem.x)) return { success: true };
        else if (filledArr.every(item => item.y == someItem.y)) return { success: true };
        else return { success: false, msg: 'حروف کلمه جدید باید در یک سطر یا ستون باشند' };
    };
    ins.prototype.setValue = function (idx, val, firstLetter) {
        if (val == "") {
            Tracker.shrinkX(idx, arr);
            Tracker.shrinkY(idx, arr);
            arr[idx].val = null;

        }
        else {
            Tracker.extendX(idx);
            Tracker.extendY(idx);
            arr[idx].val = val;
        }

    };
    ins.prototype.findWords = function () {
        if (arr[origin.id].val == null)
            return { success: false, msg: 'شروع باید از خانه مشخص شده باشد' };
        let aChk = this.axisChecker();
        if (!aChk.success) return { success: false, msg: aChk.msg };
        let rep = null, item, t, words = [], word = '', connected, firstTry = arr[origin.id].fixed == false;
        //words in columns
        for (var idx = 0; idx < Tracker.x().length; idx++) {
            t = Tracker.x()[idx];
            if (!t.changed) continue;
            word = '', connected = false;
            for (var i = t.start; i <= t.end; i++) {
                item = arr[Position.getIdx(i, idx)];
                if (!connected) connected = item.fixed;
                if (item.val != null) word += item.val;
                else break;
            }
            if (word.length > 1) {
                if (!firstTry && !connected) {
                    rep = { success: false, msg: 'حروف وارد شده باید با حروف قبلی پیوند داشته باشد' };
                    break;
                }
                if (item.val != null) words.push(word);
            }
        }

        if (rep) return rep;
        //words in columns
        for (var idx = 0; idx < Tracker.y().length; idx++) {
            t = Tracker.y()[idx];
            if (!t.changed) continue;
            word = '', connected = false;
            for (var j = t.start; j <= t.end; j++) {
                item = arr[Position.getIdx(idx, j)];
                if (!connected) connected = item.fixed;
                if (item.val != null) word += item.val;
                else break;
            }
            if (word.length > 1) {
                if (!firstTry && !connected) {
                    rep = { success: false, msg: 'حروف وارد شده باید با حروف قبلی پیوند داشته باشد' };
                    break;
                }
                if (item.val != null) words.push(word);
            }

        }
        if (words.length == 0) return { success: false, msg: 'هیچ کلمه ای ساخته نشده است' };
        return { success: true, res: words };
    };
    ins.prototype.fix = function () {
        arr.filter(x => x.fixed == false && x.val != null).forEach((x) => {
            x.fixed = true;
            $('input[data-id="' + x.id + '"]').addClass('fixed').prop('readonly', true);
        });
        fixCounter++;
    };
    ins.prototype.getFixCounter = () => fixCounter;
    ins.prototype.print = function () {
        console.log('arr: ');
        console.log(arr.filter(x => x.val !== null));
    };
    return ins;
}());