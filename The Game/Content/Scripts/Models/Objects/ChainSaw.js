/// <reference path="../Vendor/shortcut.js" />

(function ($, Backbone, exports) {
    $(function () {
        var ChainSaw = exports.App.Objects.ChainSaw = Backbone.Model.extend({
            defaults: {
                "x": undefined,
                "y": undefined,
                "width": 5,
                "height": 5,
                "lengthOfSaw": 15,
                "rotate": null
            },
            initialize: function (attrs) {
                if (attrs.x)
                    this.set("x", attrs.x);
                if (attrs.y)
                    this.set("y", attrs.y);
            },
            reset: function () {
                this.set("rotate", null);
                this.set("x", 0);
                this.set("y", 0);
                this.set("height", 5);
                this.set("width", 4);
            },
            updateDirection: function (direction, thisX, thisY, thisWidth, thisHeight) {

                this.reset();

                switch (direction) {
                    case "N": //NORTH
                    case "NE": //NORTH EAST
                    case "NW": //NORTH WEST

                        this.set("x", thisX + ((thisWidth / 2) / (this.get("width") / 2)));
                        this.set("y", thisY + (thisHeight / 2));

                        this.set("height", -parseInt(this.get("lengthOfSaw")));

                        if (direction.indexOf("E") > 0) {
                            this.set("rotate", "45");
                        } else if (direction.indexOf("W") > 0) {
                            this.set("rotate", "-45");
                        }

                        break;
                    case "E": //EAST
                        this.set("x", thisX + (thisWidth / 2));
                        this.set("y", thisY + ((thisHeight / 2) / (this.get("height") / 2)));

                        this.set("width", this.get("lengthOfSaw"));

                        break;
                    case "W": //WEST

                        this.set("x", thisX + (thisWidth / 2));
                        this.set("y", thisY + ((thisHeight / 2) / (this.get("height") / 2)));

                        this.set("width", -parseInt(this.get("lengthOfSaw")));

                        break;
                    case "S": //NORTH
                    case "SE": //NORTH EAST
                    case "SW": //NORTH WEST

                        this.set("x", thisX + ((thisWidth / 2) / (this.get("width") / 2)));
                        this.set("y", thisY + (thisHeight / 2));

                        this.set("height", this.get("lengthOfSaw"));

                        if (direction.indexOf("E") > 0) {
                            this.set("rotate", "-45");
                        } else if (direction.indexOf("W") > 0) {
                            this.set("rotate", "45");
                        }

                        break;
                }
            },
            generatePath: function (context) {
                if (this.get("rotate")) {
                    context.save();

                    // translate context to center of canvas
                    context.translate(this.get("x"), this.get("y"));
                    // rotate 45 degrees clockwise
                    context.rotate(this.get("rotate") * Math.PI / 180);

                    context.beginPath();
                    context.rect(0, 0, this.get("width"), this.get("height"));
                    context.closePath();

                    context.restore();
                } else {
                    context.beginPath();
                    context.rect(this.get("x"), this.get("y"), this.get("width"), this.get("height"));
                    context.closePath();
                }
            },
            render: function (context) {
                context.fillStyle = "black";

                this.generatePath(context);

                context.fill();
            }
        });
    });
})(jQuery, Backbone, window);