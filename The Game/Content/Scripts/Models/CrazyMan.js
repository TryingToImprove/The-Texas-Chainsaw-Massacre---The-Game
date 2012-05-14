/// <reference path="../Vendor/shortcut.js" />

(function ($, Backbone, exports) {
    $(function () {
        var CrazyMan = exports.App.Drawings.CrazyMan = Backbone.Model.extend({
            defaults: {
                "name": undefined,
                "color": "red",
                "x": 100,
                "y": 200,
                "width": 10,
                "height": 10,
                "speed": 2.5,
                "nextX": 100,
                "nextY": 200,
                "prevX": 100,
                "prevY": 200,
                "units": undefined,
                "attacking": false,
                "direction": "E",
                "chainsaw": undefined
            },
            initialize: function (attrs) {
                this.set("name", attrs.name);

                this.set("units", new window.App.Objects.Units({ x: this.get("speed"), y: this.get("speed") }));

                if (attrs.y)
                    this.set("x", attrs.x);

                if (attrs.x)
                    this.set("y", attrs.y);


                this.set("chainsaw", new window.App.Objects.ChainSaw({ x: this.get("x"), y: this.get("y") }));
            },
            move: function () {
                this.set("x", this.get("nextX"));
                this.set("y", this.get("nextY"));
            },
            hitWall: function () {
                if (((this.get("nextX") < 0 + this.get("width")) || (this.get("nextX") > window.App.Specs.width - this.get("width"))) || ((this.get("nextY") < 0 + this.get("height")) || (this.get("nextY") > window.App.Specs.height - this.get("height")))) {
                    return true;
                }
                else {
                    return false;
                }
            },
            update: function (update) {

                var updated = false;

                if (update) {
                    var direction = "";
                    if ((38 in window.App.Collections.KeysDown) || (87 in window.App.Collections.KeysDown)) {
                        this.set("prevY", this.get("y"));
                        this.set("nextY", parseInt(this.get("y")) - parseInt(this.get("units").get("y")));

                        direction += "N";

                        updated = true;
                    }
                    if ((40 in window.App.Collections.KeysDown) || (83 in window.App.Collections.KeysDown)) {
                        this.set("prevY", this.get("y"));
                        this.set("nextY", parseInt(this.get("y")) + parseInt(this.get("units").get("y")));

                        if (direction.indexOf("N") < 0) {
                            direction += "S";
                        } else {
                            direction = direction.replace("N", "S");
                        }

                        updated = true;
                    }
                    if ((37 in window.App.Collections.KeysDown) || (65 in window.App.Collections.KeysDown)) {
                        this.set("prevX", this.get("x"));
                        this.set("nextX", parseInt(this.get("x")) - parseInt(this.get("units").get("x")));

                        direction += "W";

                        updated = true;
                    }
                    if ((39 in window.App.Collections.KeysDown) || (68 in window.App.Collections.KeysDown)) {
                        this.set("prevX", this.get("x"));
                        this.set("nextX", parseInt(this.get("x")) + parseInt(this.get("units").get("x")));


                        if (direction.indexOf("W") < 0) {
                            direction += "E";
                        } else {
                            direction = direction.replace("W", "E");
                        }

                        updated = true;
                    }
                    if (updated) {
                        this.set("direction", direction);
                    }
                } else {
                    this.set("nextX", this.get("prevX"));
                    this.set("nextY", this.get("prevY"));
                }

                if (32 in window.App.Collections.KeysDown) {
                    this.set("attacking", true);
                    window.App.Audio.play("chainsaw", 0.1);
                } else {
                    this.set("attacking", false);
                    window.App.Audio.stop("chainsaw", 0.1);
                }
            },
            renderChainSaw: function (context) {
                var thisX = this.get("x"),
                    thisY = this.get("y"),
                    thisWidth = this.get("width"),
                    thisHeight = this.get("height"),
                    currentDirection = this.get("direction"),
                    chainSaw = this.get("chainsaw");

                chainSaw.updateDirection(currentDirection, thisX, thisY, thisWidth, thisHeight);
                chainSaw.render(context);

            },
            render: function (context) {
                var thisX = this.get("x"),
                    thisY = this.get("y"),
                    thisWidth = this.get("width"),
                    thisHeight = this.get("height");

                if (this.get("attacking")) {
                    this.renderChainSaw(context);
                }

                context.fillStyle = this.get("color");
                context.fillRect(thisX, thisY, thisWidth, thisHeight);
            }
        });
    });
})(jQuery, Backbone, window);