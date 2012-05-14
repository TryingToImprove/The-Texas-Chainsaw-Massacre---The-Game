/// <reference path="../Vendor/shortcut.js" />

(function ($, Backbone, exports) {
    $(function () {
        var Units = exports.App.Objects.Units = Backbone.Model.extend({
            defaults: {
                "x": undefined,
                "y": undefined
            },
            initialize: function (attrs) {
                if (attrs.x)
                    this.set("x", attrs.x);
                if (attrs.y)
                    this.set("y", attrs.y);
            }
        });
    });
})(jQuery, Backbone, window);