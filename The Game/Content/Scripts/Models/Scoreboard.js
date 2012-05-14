(function ($, Backbone, exports) {
    $(function () {
        var Scoreboard = exports.App.Drawings.Scoreboard = Backbone.Model.extend({
            defaults: {
                "killed": 0,
                "score": 0,
                "x": 14,
                "y": 152,
                "color": "black"
            },
            initialize: function (attrs) {
            },
            incrementScore: function (count) {
                this.set("score", this.get("score") + count);
            },
            incrementDeads: function (count) {
                this.set("killed", this.get("killed") + count);
            },
            render: function (context) {
                var thisX = this.get("x"),
                    thisY = this.get("y")

                context.fillStyle = this.get("color");
                context.font = 'bold 16px sans-serif';
                context.textBaseline = 'top';
                context.fillText("Score: " + this.get("score"), thisX, thisY);
            }
        });
    });
})(jQuery, Backbone, window);