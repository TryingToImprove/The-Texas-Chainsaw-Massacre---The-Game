(function ($, Backbone, exports) {
    $(function () {
        var TimeWatch = exports.App.Drawings.TimeWatch = Backbone.Model.extend({
            defaults: {
                "timeLeft": 25000,
                "timeStep": 250,
                "x": 14,
                "y": 130,
                "color": "black"
            },
            initialize: function () {
            },
            decrementTime: function (count) {
                if (!isNaN(count)) {
                    this.set("timeLeft", this.get("timeLeft") - count);

                    if (this.get("timeLeft") <= 0) {
                        window.App.State = "GAME_OVER"
                    }
                }
            },
            incrementTime: function (count) {
                this.set("timeLeft", this.get("timeLeft") + (this.get("timeStep") * 10));
            },
            render: function (context) {
                var thisX = this.get("x"),
                    thisY = this.get("y"),
                    timeLeft = (this.get("timeLeft") / 1000) % 60;

                context.fillStyle = this.get("color");
                context.font = 'bold 16px sans-serif';
                context.textBaseline = 'top';
                context.fillText("Tid tilbage: " + timeLeft, thisX, thisY);
            }
        });
    });
})(jQuery, Backbone, window);