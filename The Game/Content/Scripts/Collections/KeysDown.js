/// <reference path="_ref.js" />

(function ($, Backbone, exports) {
    $(function () {
        var KeysDown = App.Collections.KeysDown = {};

        $("body").keydown(function (e) {
            KeysDown[e.keyCode] = true;
        });

        $("body").keyup(function (e) {
            delete KeysDown[e.keyCode];
        });
    });
})(jQuery, Backbone, window);
