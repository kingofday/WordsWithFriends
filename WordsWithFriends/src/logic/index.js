///<reference path="../assets/js/jquery-3.1.1.js"/>

$(document).ready(function () {
    dawg.insert('app');
    dawg.insert('apple');
    dawg.insert('application');
    dawg.insert('apron');
    dawg.insert('bad');
    dawg.insert('badass');
    dawg.insert('navigation');
    console.log(dawg.minimizedNodes);
    dawg.finish();
    dawg.display();
    Board.init();
    //
    $(document).on('input', '.txt', function (e) {
        let $elm = $(this), val = $elm.val();
        if (val != "") $elm.removeClass('empty').addClass('has-value');
        else $elm.removeClass('has-value').addClass('empty');
        val = val.substr((val.length - 1), 1);
        $elm.val(val);
        Board.setValue($elm.data('id'), val);
    });

    //test btn
    $(document).on('click', '.btn-test', function (e) {
        let $btn = $(this);
        let rep = Board.findWords();
        Board.print();
        Tracker.print();
        if (!rep.success) {
            alert(rep.msg);
        }
        else {
            Result.show(rep.res);
        }
    });

    //fix btn
    $(document).on('click', '.btn-fix', function (e) {
        let $btn = $(this);
        let rep = Board.findWords();
        Board.print();
        Tracker.print();
        if (!rep.success)
            alert(rep.msg);
        else {
            Result.show(rep.res, true);
            Board.fix();
            Tracker.fix();
        }
    });

});

var Result = new (function () {
    var $result = $('.result');
    var ins = function () { };
    ins.prototype.show = (words, fixed = false) => {
        let wrapperId = Board.getFixCounter();
        console.log('id: ' + wrapperId);
        $result.find('.w-' + wrapperId).remove();
        let $wrapper = $('<div></div>', { class: 'wrapper w-' + wrapperId + (fixed ? ' fixed' : ''), });
        words.forEach((w, idx) => {
            if (idx == 0) $wrapper.append(((wrapperId + 1).toString() + '- '));
            else $wrapper.append('-');
            $wrapper.append($('<label class="name"></label>').text(w));
        });
        $result.append($wrapper);
    };
    return ins;


    $result.append($wrapper);
}());

var KeyNavigator = function () {

    //$(document).on('input',)
};