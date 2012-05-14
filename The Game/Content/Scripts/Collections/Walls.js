$(function () {
    var Walls = App.Collections.Walls = function () {

        var walls = {};
        walls.current = [];

        walls.add = function (wall) {
            this.current.push(wall);
        };

        walls.hit = function (x, y, width, height) {
            for (var i = 0; i < this.current.length; i++) {

                var wall = this.current[i];

                if (wall.hit(x, y, width, height)) {
                    return true;
                }

            }
            return false;
        };

        walls.renderAll = function (context) {
            for (var i = 0; i < this.current.length; i++) {
                this.current[i].render(context);
            }
        }

        return walls;

    } ();
});
