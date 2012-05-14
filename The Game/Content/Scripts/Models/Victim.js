/// <reference path="../Vendor/shortcut.js" />

(function ($, Backbone, exports) {
    $(function () {
        var Victim = exports.App.Drawings.Victim = Backbone.Model.extend({
            defaults: {
                "name": undefined,
                "color": "green",
                "x": 100,
                "y": 200,
                "nextX": null,
                "nextY": null,
                "width": 10,
                "height": 10,
                "health": 100,
                "dead": false,
                "escaping": false,
                "escapingInterval": null,
                "direction": "right",
                "speed": 1,
                "lastHit": 0
            },
            initialize: function (attrs) {
                this.set("name", attrs.name);

                var randomPosition = window.App.Collections.Victims.getRandomPosition();

                this.set("x", randomPosition.x);
                this.set("y", randomPosition.y);

                this.changeDirection();
            },
            changeDirection: function (lastTry) {
                var randomDirection = "",
                    randomDirectionNumber = Math.floor(Math.random() * 3);

                switch (randomDirectionNumber) {
                    case 0:
                        randomDirection = "left";
                        break;
                    case 1:
                        randomDirection = "right";
                        break;
                    case 2:
                        randomDirection = "up";
                        break;
                    default:
                        randomDirection = "down";
                        break;
                }
                this.set("nextX", this.get("x"));
                this.set("nextY", this.get("y"));
                this.set("direction", randomDirection);
            },
            render: function (context) {
                var 
                    thisWidth = this.get("width"),
                    thisHeight = this.get("height"),
                    thisEscaping = this.get("escaping"),
                    thisDirection = this.get("direction"),
                    thisSpeed = this.get("speed");

                if (this.get("escapingInterval") > 0) {
                    if (this.get("nextX") != null) {
                        this.set("x", this.get("nextX"));
                    }
                    if (this.get("nextY") != null) {
                        this.set("y", this.get("nextY"));
                    }
                    this.move(thisDirection);
                    this.set("escapingInterval", this.get("escapingInterval") - 1);
                }

                context.fillStyle = this.get("color");
                context.fillRect(this.get("x"), this.get("y"), thisWidth, thisHeight);
            },
            move: function (thisDirection) {
                switch (thisDirection) {
                    case "left":
                        this.set("nextX", this.get("x") - this.get("speed"));
                        this.set("nextY", this.get("y"))
                        break;
                    case "right":
                        this.set("nextX", this.get("x") + this.get("speed"));
                        this.set("nextY", this.get("y"))
                        break;
                    case "up":
                        this.set("nextX", this.get("x"))
                        this.set("nextY", this.get("y") - this.get("speed"));
                        break;
                    case "down":
                        this.set("nextX", this.get("y"))
                        this.set("nextY", this.get("y") + this.get("speed"));
                        break;
                    default:
                        console.log("Where are you going? :D");
                        break;
                }
            },
            hitting: function () {
                var that = this;

                window.App.Audio.play("scream");

                this.set("health", this.get("health") - 4);

                if (this.get("health") <= 0) {
                    this.set("dead", true);
                    window.App.Audio.stop("scream");
                }

                if (this.get("lastHit") > 10) {
                    this.set("lastHit", 0);
                }
                if (this.get("lastHit") === 0) {
                    this.changeDirection();
                }

                this.set("escapingInterval", 450);

                this.set("lastHit", this.get("lastHit") + 1);
                this.set("escaping", true);
            }
        });
    });
})(jQuery, Backbone, window);