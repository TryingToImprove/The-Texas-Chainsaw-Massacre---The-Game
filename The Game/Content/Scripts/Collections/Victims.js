/// <reference path="_ref.js" />

(function ($, Backbone, exports) {

    $(function () {
        var Victims = App.Collections.Victims = function () {

            var victims = {};
            victims.current = [];

            victims.possiblePositions = [
                { x: 740, y: 330 },
                { x: 680, y: 381 },
                { x: 582, y: 339 },
                { x: 350, y: 113 },
                { x: 450, y: 154 },
                { x: 583, y: 143 },
                { x: 566, y: 255 },
                { x: 346, y: 481 },
                { x: 401, y: 484 },
                { x: 182, y: 313 },
                { x: 98, y: 413 }
            ];

            victims.getRandomPosition = function () {
                var haveFoundAPosition = false, position = undefined;

                while (!haveFoundAPosition) {
                    var randomNum = Math.floor(Math.random() * victims.possiblePositions.length),
                        randomPosition = victims.possiblePositions[randomNum],
                        placed = true;

                    for (var i = 0; i < this.current.length; i++) {
                        var victim = this.current[i];
                        if ((victim.get("x") === randomPosition.x) && (victim.get("y") === randomPosition.y)) {
                            placed = false;
                        }
                    }

                    position = randomPosition;
                    haveFoundAPosition = placed;
                }

                return position;
            }

            victims.add = function (victim) {
                this.current.push(victim);
            };

            victims.generateNew = function () {
                var victim = new window.App.Drawings.Victim({ name: "Kim" });
                return victim;
            };

            victims.chainSawHitting = function (chainSaw, context) {

                chainSaw.generatePath(context);

                for (var i = 0; i < this.current.length; i++) {

                    var victim = this.current[i];

                    for (var x = victim.get("x"); x < victim.get("x") + victim.get("width"); x++) {
                        for (var y = victim.get("y"); y < victim.get("y") + victim.get("height"); y++) {
                            if (context.isPointInPath(x, y)) {
                                return victim;
                            }
                        }
                    }

                }
                return false;
            };

            victims.changeDirections = function () {
                for (var i = 0; i < this.current.length; i++) {
                    var victim = this.current[i],
                        x = victim.get("nextX"),
                        y = victim.get("nextY"),
                        width = victim.get("width"),
                        height = victim.get("height");

                    if (
                            (
                                window.App.Collections.Buildings.hit(
                                    victim.get("nextX"),
                                    victim.get("nextY"),
                                    victim.get("width"),
                                    victim.get("height")
                                )
                            )
                            ||
                            (
                                window.App.Collections.Walls.hit(
                                    victim.get("nextX"),
                                    victim.get("nextY"),
                                    victim.get("width"),
                                    victim.get("height")
                                )
                            )
                            ||
                            (
                                ((victim.get("nextX") < 0 + victim.get("width")) || (victim.get("nextX") > window.App.Specs.width - victim.get("width"))) ||
                                ((victim.get("nextY") < 0 + victim.get("height")) || (victim.get("nextY") > window.App.Specs.height - victim.get("height")))
                            )

                        ) {
                        victim.changeDirection();
                    }

                }
            };

            victims.destroy = function (victim) {
                var indexOfVictom = this.current.indexOf(victim);
                this.current.splice(indexOfVictom, 1);
            };

            victims.renderAll = function (context) {
                for (var i = this.current.length - 1; i >= 0; i--) {
                    var victim = this.current[i];

                    if (victim.get("dead")) {
                        this.destroy(victim);
                    }

                    victim.render(context);
                }

                if (this.current.length === 0) {
                    window.App.Collections.Victims.add(this.generateNew());
                }
            }

            return victims;

        } ();
    });

})(jQuery, Backbone, window);
